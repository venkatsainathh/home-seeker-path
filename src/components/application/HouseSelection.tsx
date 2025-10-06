import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import { toast } from "sonner";

interface HouseSelectionProps {
  onUpdate: (data: any) => void;
  onSubmit: () => void;
}

// Mock house data
const availableHouses = [
  {
    id: "1",
    address: "7401 Baltimore Ave, College Park, MD 20740",
    beds: 3,
    baths: 2,
    price: "$285,000",
  },
  {
    id: "2",
    address: "7500 College Park Blvd, College Park, MD 20740",
    beds: 4,
    baths: 2.5,
    price: "$325,000",
  },
  {
    id: "3",
    address: "8200 Lakeland Dr, College Park, MD 20740",
    beds: 3,
    baths: 2,
    price: "$295,000",
  },
  {
    id: "4",
    address: "7800 Valley View Ln, College Park, MD 20740",
    beds: 2,
    baths: 1.5,
    price: "$245,000",
  },
];

const HouseSelection = ({ onUpdate, onSubmit }: HouseSelectionProps) => {
  const [selectedHouses, setSelectedHouses] = useState<string[]>([]);
  const [joinWaitlist, setJoinWaitlist] = useState(false);

  const handleHouseSelection = (houseId: string, checked: boolean) => {
    const updated = checked
      ? [...selectedHouses, houseId]
      : selectedHouses.filter((id) => id !== houseId);
    setSelectedHouses(updated);
    onUpdate({ selectedHouses: updated, joinWaitlist: false });
    setJoinWaitlist(false);
  };

  const handleWaitlist = (checked: boolean) => {
    setJoinWaitlist(checked);
    if (checked) {
      setSelectedHouses([]);
      onUpdate({ selectedHouses: [], joinWaitlist: true });
    }
  };

  const handleFinalSubmit = () => {
    if (selectedHouses.length === 0 && !joinWaitlist) {
      toast.error("Please select at least one house or join the waitlist");
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Available Properties</h2>
        <p className="text-sm text-muted-foreground">
          Select the properties you're interested in, or join our waitlist for future opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableHouses.map((house) => (
          <div
            key={house.id}
            className={`border-2 rounded-lg p-4 transition-all ${
              selectedHouses.includes(house.id)
                ? "border-accent bg-accent/10"
                : "border-muted hover:border-accent/50"
            }`}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                id={`house-${house.id}`}
                checked={selectedHouses.includes(house.id)}
                onCheckedChange={(checked) =>
                  handleHouseSelection(house.id, checked as boolean)
                }
                disabled={joinWaitlist}
              />
              <div className="flex-1">
                <Label
                  htmlFor={`house-${house.id}`}
                  className="cursor-pointer font-normal"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Home className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-semibold text-primary">
                      {house.address}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1 ml-7">
                    <p>
                      {house.beds} beds · {house.baths} baths
                    </p>
                    <p className="font-semibold text-primary">{house.price}</p>
                  </div>
                </Label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="waitlist"
              checked={joinWaitlist}
              onCheckedChange={handleWaitlist}
            />
            <div>
              <Label htmlFor="waitlist" className="cursor-pointer font-semibold text-base">
                None of these homes interest me - Add me to the waitlist
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                We'll notify you when new properties become available that match your preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleFinalSubmit}
          size="lg"
          className="rounded-full px-12"
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
};

export default HouseSelection;
