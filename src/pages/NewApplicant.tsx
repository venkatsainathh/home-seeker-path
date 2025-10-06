import { useState } from "react";
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

const TOTAL_STEPS = 8;

const NewApplicant = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFormData = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
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

  const handleSubmit = () => {
    toast.success("Application submitted successfully!");
    console.log("Form Data:", formData);
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
