import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReferencesProps {
  onUpdate: (data: any) => void;
}

const References = ({ onUpdate }: ReferencesProps) => {
  const [formData, setFormData] = useState({
    reference1Name: "",
    reference1Phone: "",
    reference1Email: "",
    reference1Relationship: "",
    reference2Name: "",
    reference2Phone: "",
    reference2Email: "",
    reference2Relationship: "",
  });

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">References</h2>
        <p className="text-sm text-muted-foreground">
          Provide contact information for two non-related references you have known for at least one year
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="font-semibold mb-4">Reference 1</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reference1Name">Full Name *</Label>
              <Input
                id="reference1Name"
                value={formData.reference1Name}
                onChange={(e) => handleChange("reference1Name", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reference1Phone">Phone Number *</Label>
                <Input
                  id="reference1Phone"
                  type="tel"
                  value={formData.reference1Phone}
                  onChange={(e) => handleChange("reference1Phone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reference1Email">Email Address</Label>
                <Input
                  id="reference1Email"
                  type="email"
                  value={formData.reference1Email}
                  onChange={(e) => handleChange("reference1Email", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reference1Relationship">Relationship *</Label>
              <Input
                id="reference1Relationship"
                value={formData.reference1Relationship}
                onChange={(e) => handleChange("reference1Relationship", e.target.value)}
                placeholder="e.g., Friend, Colleague, Mentor"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Reference 2</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reference2Name">Full Name *</Label>
              <Input
                id="reference2Name"
                value={formData.reference2Name}
                onChange={(e) => handleChange("reference2Name", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reference2Phone">Phone Number *</Label>
                <Input
                  id="reference2Phone"
                  type="tel"
                  value={formData.reference2Phone}
                  onChange={(e) => handleChange("reference2Phone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reference2Email">Email Address</Label>
                <Input
                  id="reference2Email"
                  type="email"
                  value={formData.reference2Email}
                  onChange={(e) => handleChange("reference2Email", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reference2Relationship">Relationship *</Label>
              <Input
                id="reference2Relationship"
                value={formData.reference2Relationship}
                onChange={(e) => handleChange("reference2Relationship", e.target.value)}
                placeholder="e.g., Friend, Colleague, Mentor"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default References;
