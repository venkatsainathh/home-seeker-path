import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface HouseholdInfoProps {
  onUpdate: (data: any) => void;
}

interface HouseholdMember {
  name: string;
  age: string;
}

const HouseholdInfo = ({ onUpdate }: HouseholdInfoProps) => {
  const [members, setMembers] = useState<HouseholdMember[]>([{ name: "", age: "" }]);

  const addMember = () => {
    const updated = [...members, { name: "", age: "" }];
    setMembers(updated);
    onUpdate({ householdMembers: updated });
  };

  const removeMember = (index: number) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
    onUpdate({ householdMembers: updated });
  };

  const updateMember = (index: number, field: "name" | "age", value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
    onUpdate({ householdMembers: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Household Information</h2>
        <p className="text-sm text-muted-foreground">
          Include all adults and children living at least 50% of their time in the household
        </p>
      </div>

      <div>
        <Label className="text-base font-semibold">
          Number of Household Members: {members.length}
        </Label>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Household Members</Label>
        {members.map((member, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor={`member-name-${index}`}>Name</Label>
              <Input
                id={`member-name-${index}`}
                value={member.name}
                onChange={(e) => updateMember(index, "name", e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="w-32">
              <Label htmlFor={`member-age-${index}`}>Age</Label>
              <Input
                id={`member-age-${index}`}
                type="number"
                value={member.age}
                onChange={(e) => updateMember(index, "age", e.target.value)}
                placeholder="Age"
              />
            </div>
            {members.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeMember(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addMember}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Household Member
      </Button>
    </div>
  );
};

export default HouseholdInfo;
