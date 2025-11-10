import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import PersonalInfo from "@/components/application/PersonalInfo";
import AgentInfo from "@/components/application/AgentInfo";
import LakelandHeritage from "@/components/application/LakelandHeritage";
import HouseholdInfo from "@/components/application/HouseholdInfo";
import FinancialInfo from "@/components/application/FinancialInfo";
import HomeownershipInfo from "@/components/application/HomeownershipInfo";
import References from "@/components/application/References";
import HouseSelection from "@/components/application/HouseSelection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const TOTAL_STEPS = 8;

const NewApplicant = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load existing application if any
  useEffect(() => {
    const loadApplication = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("applications")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!error && data) {
          setApplicationId(data.id);
          setFormData({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phone: data.phone,
            dateOfBirth: data.date_of_birth,
            ssn: data.ssn,
            driversLicense: data.drivers_license,
            maritalStatus: data.marital_status,
            currentAddress: data.current_address,
            city: data.city,
            state: data.state,
            zipCode: data.zip_code,
            yearsAtAddress: data.years_at_address,
            ownOrRent: data.own_or_rent,
            employer: data.employer,
            occupation: data.occupation,
            yearsEmployed: data.years_employed,
            annualIncome: data.annual_income,
            additionalIncome: data.additional_income,
            creditScore: data.credit_score,
            householdMembers: data.household_members || [],
            firstTimeBuyer: data.first_time_buyer,
            preApproved: data.pre_approved,
            downPaymentAmount: data.down_payment_amount,
            lakelandConnection: data.lakeland_connection,
            lakelandDetails: data.lakeland_details,
            references: data.personal_references || [],
            agentName: data.agent_name,
            agentPhone: data.agent_phone,
            agentEmail: data.agent_email,
            selectedHouses: data.selected_houses || [],
            joinWaitlist: data.join_waitlist,
          });
        }
      } catch (error) {
        console.error("Error loading application:", error);
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [user]);

  const updateFormData = (stepData: any) => {
    setFormData((prev: any) => ({ ...prev, ...stepData }));
  };

  // Auto-save as draft
  const saveApplication = async (status: string = "draft") => {
    if (!user) return;

    try {
      const applicationData = {
        user_id: user.id,
        status,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        ssn: formData.ssn,
        drivers_license: formData.driversLicense,
        marital_status: formData.maritalStatus,
        current_address: formData.currentAddress,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        years_at_address: formData.yearsAtAddress,
        own_or_rent: formData.ownOrRent,
        employer: formData.employer,
        occupation: formData.occupation,
        years_employed: formData.yearsEmployed,
        annual_income: formData.annualIncome,
        additional_income: formData.additionalIncome,
        credit_score: formData.creditScore,
        household_members: formData.householdMembers || [],
        first_time_buyer: formData.firstTimeBuyer,
        pre_approved: formData.preApproved,
        down_payment_amount: formData.downPaymentAmount,
        lakeland_connection: formData.lakelandConnection,
        lakeland_details: formData.lakelandDetails,
        personal_references: formData.references || [],
        agent_name: formData.agentName,
        agent_phone: formData.agentPhone,
        agent_email: formData.agentEmail,
        selected_houses: formData.selectedHouses || [],
        join_waitlist: formData.joinWaitlist,
      };

      if (applicationId) {
        const { error } = await supabase
          .from("applications")
          .update(applicationData)
          .eq("id", applicationId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("applications")
          .insert([applicationData])
          .select()
          .single();

        if (error) throw error;
        setApplicationId(data.id);
      }
    } catch (error) {
      console.error("Error saving application:", error);
      toast.error("Failed to save application");
    }
  };

  const handleNext = async () => {
    await saveApplication("draft");
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    await saveApplication("submitted");
    toast.success("Application submitted successfully!");
    navigate("/");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo onUpdate={updateFormData} />;
      case 2:
        return <AgentInfo onUpdate={updateFormData} />;
      case 3:
        return <LakelandHeritage onUpdate={updateFormData} />;
      case 4:
        return <HouseholdInfo onUpdate={updateFormData} />;
      case 5:
        return <FinancialInfo onUpdate={updateFormData} />;
      case 6:
        return <HomeownershipInfo onUpdate={updateFormData} />;
      case 7:
        return <References onUpdate={updateFormData} />;
      case 8:
        return <HouseSelection onUpdate={updateFormData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Homebuyer Application
            </h1>
            <p className="text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-card rounded-[25px] border-2 border-muted shadow-lg p-8 mb-6">
            {renderStep()}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="rounded-full"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentStep < TOTAL_STEPS ? (
              <Button onClick={handleNext} className="rounded-full">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewApplicant;
