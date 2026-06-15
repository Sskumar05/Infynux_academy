-- 1. Ensure RLS is enabled on the table
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop the existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Enable insert for anyone" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.contact_messages;

-- 3. Create a permissive INSERT policy specifically for anonymous and authenticated users
CREATE POLICY "Enable insert for anyone" 
ON public.contact_messages 
FOR INSERT 
TO public
WITH CHECK (true);

-- 4. Create a full CRUD policy for the Admin dashboard (authenticated users only)
CREATE POLICY "Enable all access for authenticated users" 
ON public.contact_messages 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
