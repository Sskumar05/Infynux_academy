import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { internshipService } from "@/services/internshipService";
import { emailService } from "@/services/emailService";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  mobile: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid mobile number"),
  school: z.string().trim().min(2, "Required").max(120),
  qualification: z.string().trim().min(1, "Required").max(80),
  domain: z.string().min(1, "Please choose a domain"),
  resume: z.any().refine((f) => f && f.length > 0, "Upload your resume"),
  linkedin: z.string().trim().url("Enter a valid URL").or(z.literal("")).optional(),
  portfolio: z.string().trim().url("Enter a valid URL").or(z.literal("")).optional(),
});

type FormValues = z.infer<typeof schema>;

const DOMAINS = [
  "Frontend Development", "Backend Development", "Full Stack Development",
  "Flutter", "Android (Kotlin)", "AWS",
  "AI Tools", "Automation Workflows", "SEO", "Social Media Marketing",
];

export function InternshipModal({
  open, onOpenChange, presetDomain,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  presetDomain?: string;
}) {
  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { domain: "" },
  });

  const domain = watch("domain");

  useEffect(() => {
    if (presetDomain) {
      const match = DOMAINS.find((d) => presetDomain.includes(d));
      if (match) setValue("domain", match);
    }
  }, [presetDomain, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      let resume_url = "";
      
      // Upload Resume if it exists
      if (data.resume && data.resume.length > 0) {
        const file = data.resume[0] as File;
        resume_url = await internshipService.uploadResume(file);
      }

      // Submit application data
      await internshipService.submitApplication({
        full_name: data.fullName,
        email: data.email,
        mobile_number: data.mobile,
        college_name: data.school,
        qualification: data.qualification,
        internship_domain: data.domain,
        linkedin_url: data.linkedin || "",
        github_url: data.portfolio || "",
        resume_url,
      });

      // Send emails asynchronously (fire and forget)
      emailService.sendInternshipConfirmation({
        name: data.fullName,
        email: data.email,
        domain: data.domain,
      });
      emailService.sendAdminNotification({
        name: data.fullName,
        email: data.email,
        mobile: data.mobile,
        college: data.school,
        domain: data.domain,
      });

      toast.success("Application submitted successfully.", {
        description: "Our team will reach out within 48 hours.",
      });
      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error("Failed to submit application.", {
        description: error.message || "Please try again later.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--navy-light)] border-[var(--cyan)]/15 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Apply for Internship</DialogTitle>
          <DialogDescription className="text-[var(--muted-foreground)]">
            Fill in the details below. Fields marked * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name *" error={errors.fullName?.message}>
              <Input {...register("fullName")} placeholder="Jane Doe" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
            </Field>
            <Field label="Email Address *" error={errors.email?.message}>
              <Input type="email" {...register("email")} placeholder="jane@email.com" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
            </Field>
            <Field label="Mobile Number *" error={errors.mobile?.message}>
              <Input type="tel" {...register("mobile")} placeholder="+91 98765 43210" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
            </Field>
            <Field label="School / College *" error={errors.school?.message}>
              <Input {...register("school")} placeholder="IIT Bombay" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
            </Field>
            <Field label="Current Year / Qualification *" error={errors.qualification?.message}>
              <Input {...register("qualification")} placeholder="3rd Year B.Tech" className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
            </Field>
            <Field label="Internship Domain *" error={errors.domain?.message}>
              <Select value={domain} onValueChange={(v) => setValue("domain", v, { shouldValidate: true })}>
                <SelectTrigger className="bg-white/5 border-[var(--cyan)]/15 text-white"><SelectValue placeholder="Choose a domain" /></SelectTrigger>
                <SelectContent className="bg-[var(--navy-light)] border-[var(--cyan)]/15">
                  {DOMAINS.map((d) => <SelectItem key={d} value={d} className="text-white/80 hover:text-white">{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Resume Upload *" error={errors.resume?.message as string | undefined} className="sm:col-span-2">
              <Input type="file" accept=".pdf,.doc,.docx" {...register("resume")} className="bg-white/5 border-[var(--cyan)]/15 text-white/70 file:text-[var(--cyan)] file:bg-transparent file:border-0" />
            </Field>
            <Field label="LinkedIn Profile" error={errors.linkedin?.message}>
              <Input {...register("linkedin")} placeholder="https://linkedin.com/in/..." className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
            </Field>
            <Field label="GitHub / Portfolio" error={errors.portfolio?.message}>
              <Input {...register("portfolio")} placeholder="https://github.com/..." className="bg-white/5 border-[var(--cyan)]/15 text-white placeholder:text-white/30" />
            </Field>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-white/70 hover:text-white hover:bg-white/5">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="btn-cta rounded-full px-6">
              {isSubmitting ? "Submitting..." : "Apply Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label, error, children, className,
}: {
  label: string; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={"grid gap-1.5 " + (className ?? "")}>
      <Label className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-wider">{label}</Label>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
