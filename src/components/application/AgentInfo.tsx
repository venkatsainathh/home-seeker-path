import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AgentInfoProps {
  onUpdate: (data: any) => void;
}

const AgentInfo = ({ onUpdate }: AgentInfoProps) => {
  const [formData, setFormData] = useState({
    agentName: "",
    agentPhone: "",
    agentEmail: "",
  });

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Real Estate Agent Information</h2>
        <p className="text-muted-foreground">Optional - Provide your real estate agent's contact information if applicable</p>
      </div>

      <div>
        <Label htmlFor="agentName">Agent Name</Label>
        <Input
          id="agentName"
          value={formData.agentName}
          onChange={(e) => handleChange("agentName", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="agentPhone">Phone Number</Label>
        <Input
          id="agentPhone"
          type="tel"
          value={formData.agentPhone}
          onChange={(e) => handleChange("agentPhone", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="agentEmail">Email Address</Label>
        <Input
          id="agentEmail"
          type="email"
          value={formData.agentEmail}
          onChange={(e) => handleChange("agentEmail", e.target.value)}
        />
      </div>
    </div>
  );
};

export default AgentInfo;
