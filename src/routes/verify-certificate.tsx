import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { certificateService, Certificate } from "@/services/certificateService";
import { Search, CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/verify-certificate")({
  head: () => ({
    meta: [
      { title: "Verify Certificate — INFYNUX Academy" },
      { name: "description", content: "Verify the authenticity of an INFYNUX Academy certificate." },
    ],
  }),
  component: VerifyCertificatePage,
});

function VerifyCertificatePage() {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await certificateService.verifyCertificate(certId.trim());
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="hero-bg pt-16 pb-12">
        <div className="container-x text-center">
          <SectionHeader eyebrow="Verification" title="Verify Certificate" description="Enter the certificate ID to verify its authenticity and details." />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x max-w-2xl mx-auto">
          <form onSubmit={handleVerify} className="card-premium p-8 grid gap-4">
            <h3 className="text-xl font-bold text-white text-center mb-2">Certificate ID</h3>
            <div className="flex gap-3">
              <Input 
                value={certId} 
                onChange={(e) => setCertId(e.target.value)} 
                placeholder="e.g. INF-2026-XXXX" 
                className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30 h-12 text-lg" 
              />
              <Button type="submit" disabled={loading} className="btn-cta rounded-lg px-6 h-12">
                {loading ? "..." : <><Search className="h-5 w-5 mr-2" /> Verify</>}
              </Button>
            </div>
          </form>

          {searched && !loading && (
            <div className="mt-8">
              {result ? (
                <div className="card-premium p-8 border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-emerald-400">Verified Certificate</h3>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">Student Name</div>
                      <div className="text-white text-lg font-semibold">{result.student_name}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">Course / Program</div>
                      <div className="text-white text-lg font-semibold">{result.course_name}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">Issue Date</div>
                      <div className="text-white text-lg font-semibold">{new Date(result.issue_date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">Certificate ID</div>
                      <div className="text-white text-lg font-semibold">{result.certificate_id}</div>
                    </div>
                    {result.certificate_url && (
                      <div className="mt-4">
                        <a href={result.certificate_url} target="_blank" rel="noreferrer" className="text-[var(--cyan)] hover:underline text-sm font-semibold">
                          View Original Certificate Document &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card-premium p-8 border-rose-500/30 text-center">
                  <XCircle className="h-12 w-12 text-rose-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-rose-400 mb-2">Certificate Not Found</h3>
                  <p className="text-[var(--muted-foreground)]">We couldn't find a certificate matching the ID "{certId}". Please check the ID and try again.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
