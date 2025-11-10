-- Create applications table to store all application data
CREATE TABLE public.applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  -- Application status
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'pending_info', 'ready_for_match', 'approved', 'rejected')),
  admin_notes text,
  
  -- Personal Information
  first_name text,
  last_name text,
  email text,
  phone text,
  date_of_birth date,
  ssn text,
  drivers_license text,
  marital_status text,
  
  -- Address
  current_address text,
  city text,
  state text,
  zip_code text,
  years_at_address integer,
  own_or_rent text,
  
  -- Financial Information
  employer text,
  occupation text,
  years_employed integer,
  annual_income numeric,
  additional_income numeric,
  credit_score integer,
  
  -- Household Information
  household_members jsonb DEFAULT '[]'::jsonb,
  
  -- Homeownership Information
  first_time_buyer boolean,
  pre_approved boolean,
  down_payment_amount numeric,
  
  -- Lakeland Heritage
  lakeland_connection boolean DEFAULT false,
  lakeland_details text,
  
  -- References
  personal_references jsonb DEFAULT '[]'::jsonb,
  
  -- Agent Information
  agent_name text,
  agent_phone text,
  agent_email text,
  
  -- House Selection
  selected_houses jsonb DEFAULT '[]'::jsonb,
  join_waitlist boolean DEFAULT false,
  
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policies for applications
CREATE POLICY "Users can view own application"
  ON public.applications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own application"
  ON public.applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own application"
  ON public.applications
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON public.applications
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all applications"
  ON public.applications
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create messages table for communication between applicants and staff
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  is_admin boolean NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies for messages
CREATE POLICY "Users can view messages for own application"
  ON public.messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = messages.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages for own application"
  ON public.messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = messages.application_id
      AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all messages"
  ON public.messages
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert messages"
  ON public.messages
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create properties table for homeowners
CREATE TABLE public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address text NOT NULL,
  homeowner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Policies for properties
CREATE POLICY "Homeowners can view own properties"
  ON public.properties
  FOR SELECT
  USING (auth.uid() = homeowner_id);

CREATE POLICY "Admins can view all properties"
  ON public.properties
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage properties"
  ON public.properties
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add homeowner to app_role enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'homeowner' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')) THEN
    ALTER TYPE public.app_role ADD VALUE 'homeowner';
  END IF;
END $$;