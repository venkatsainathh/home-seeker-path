import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PersonalInfoProps {
  onUpdate: (data: any) => void;
}

const PersonalInfo = ({ onUpdate }: PersonalInfoProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    currentAddress: "",
    postalCode: "",
    preferredContact: "",
    sameMailingAddress: "yes",
    mailingAddress: "",
    occupation: "",
    employer: "",
  });

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="middleName">Middle Name</Label>
          <Input
            id="middleName"
            value={formData.middleName}
            onChange={(e) => handleChange("middleName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentAddress">Current Address *</Label>
          <Input
            id="currentAddress"
            value={formData.currentAddress}
            onChange={(e) => handleChange("currentAddress", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="preferredContact">Preferred Contact Method</Label>
        <Select
          value={formData.preferredContact}
          onValueChange={(value) => handleChange("preferredContact", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select preferred method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="text">Text Message</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Is your current address the same as your mailing address?</Label>
        <RadioGroup
          value={formData.sameMailingAddress}
          onValueChange={(value) => handleChange("sameMailingAddress", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.sameMailingAddress === "no" && (
        <div>
          <Label htmlFor="mailingAddress">Mailing Address</Label>
          <Input
            id="mailingAddress"
            value={formData.mailingAddress}
            onChange={(e) => handleChange("mailingAddress", e.target.value)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="employer">Employer Organization</Label>
          <Input
            id="employer"
            value={formData.employer}
            onChange={(e) => handleChange("employer", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
