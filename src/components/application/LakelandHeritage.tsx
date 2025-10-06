import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface LakelandHeritageProps {
  onUpdate: (data: any) => void;
}

const LakelandHeritage = ({ onUpdate }: LakelandHeritageProps) => {
  const [formData, setFormData] = useState({
    lakelandConnection: false,
    lakelandDetails: "",
  });

  const handleConnectionChange = (checked: boolean) => {
    const updated = { ...formData, lakelandConnection: checked };
    setFormData(updated);
    onUpdate(updated);
  };

  const handleDetailsChange = (value: string) => {
    const updated = { ...formData, lakelandDetails: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Lakeland Heritage</h2>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">College Park Community Preservation Trust</h3>
        <p className="text-sm mb-4 leading-relaxed">
          From the 1960's through the mid-1980's, the urban renewal process in Lakeland, 
          College Park demolished many family homes, displaced 104 of 150 households, and 
          replaced much of the neighborhood with a mix of subsidized townhouses, high-density 
          apartments largely inhabited by students, and an elder housing facility. Few of the 
          many families forced to leave during construction could resettle in Lakeland.
        </p>
        <p className="text-sm leading-relaxed">
          The Community Preservation Trust is particularly committed to creating avenues for 
          both current and former Lakeland residents, as well as their descendants to reconnect 
          with College Park.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="lakelandConnection"
            checked={formData.lakelandConnection}
            onCheckedChange={handleConnectionChange}
          />
          <Label 
            htmlFor="lakelandConnection" 
            className="font-normal leading-relaxed cursor-pointer"
          >
            I am a current or former resident of Lakeland, or a descendant of someone who 
            lived in Lakeland.
          </Label>
        </div>

        {formData.lakelandConnection && (
          <div>
            <Label htmlFor="lakelandDetails">
              Please provide additional context about your connection to Lakeland
            </Label>
            <Textarea
              id="lakelandDetails"
              value={formData.lakelandDetails}
              onChange={(e) => handleDetailsChange(e.target.value)}
              placeholder="Describe your connection to Lakeland..."
              className="min-h-32 mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LakelandHeritage;
