import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HomeownershipInfoProps {
  onUpdate: (data: any) => void;
}

const HomeownershipInfo = ({ onUpdate }: HomeownershipInfoProps) => {
  const [formData, setFormData] = useState({
    previousOwnership: "",
    ownershipDetails: "",
    bankruptcy: "",
    bankruptcyDetails: "",
    fullTimeStudent: "",
    hasPets: "",
    smokes: "",
    preferredHome: "",
  });

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Homeownership Information</h2>

      <div>
        <Label>Have you previously owned a home?</Label>
        <RadioGroup
          value={formData.previousOwnership}
          onValueChange={(value) => handleChange("previousOwnership", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="ownership-yes" />
            <Label htmlFor="ownership-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="ownership-no" />
            <Label htmlFor="ownership-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.previousOwnership === "yes" && (
        <div>
          <Label htmlFor="ownershipDetails">When? Please explain.</Label>
          <Textarea
            id="ownershipDetails"
            value={formData.ownershipDetails}
            onChange={(e) => handleChange("ownershipDetails", e.target.value)}
            className="min-h-24"
          />
        </div>
      )}

      <div>
        <Label>Have you declared bankruptcy in the past three years?</Label>
        <RadioGroup
          value={formData.bankruptcy}
          onValueChange={(value) => handleChange("bankruptcy", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="bankruptcy-yes" />
            <Label htmlFor="bankruptcy-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="bankruptcy-no" />
            <Label htmlFor="bankruptcy-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.bankruptcy === "yes" && (
        <div>
          <Label htmlFor="bankruptcyDetails">When? Please explain.</Label>
          <Textarea
            id="bankruptcyDetails"
            value={formData.bankruptcyDetails}
            onChange={(e) => handleChange("bankruptcyDetails", e.target.value)}
            className="min-h-24"
          />
        </div>
      )}

      <div>
        <Label>Have you or any member of your household been a full-time student in the past year?</Label>
        <RadioGroup
          value={formData.fullTimeStudent}
          onValueChange={(value) => handleChange("fullTimeStudent", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="student-yes" />
            <Label htmlFor="student-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="student-no" />
            <Label htmlFor="student-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Do you or any member of your household have pets?</Label>
        <RadioGroup
          value={formData.hasPets}
          onValueChange={(value) => handleChange("hasPets", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pets-yes" />
            <Label htmlFor="pets-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pets-no" />
            <Label htmlFor="pets-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Do you or any members of your household smoke?</Label>
        <RadioGroup
          value={formData.smokes}
          onValueChange={(value) => handleChange("smokes", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="smoke-yes" />
            <Label htmlFor="smoke-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="smoke-no" />
            <Label htmlFor="smoke-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="preferredHome">Describe your preferred home</Label>
        <Textarea
          id="preferredHome"
          value={formData.preferredHome}
          onChange={(e) => handleChange("preferredHome", e.target.value)}
          placeholder="Number of beds, baths, preferred neighborhood, fenced yard, accessibility needs, etc."
          className="min-h-32"
        />
      </div>
    </div>
  );
};

export default HomeownershipInfo;
