import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FinancialInfoProps {
  onUpdate: (data: any) => void;
}

const FinancialInfo = ({ onUpdate }: FinancialInfoProps) => {
  const [formData, setFormData] = useState({
    applicantIncome: "",
    householdIncome: "",
    monthlyRent: "",
    desiredHousingExpense: "",
    monthlyExpenses: "",
    savingsBalance: "",
    otherSavings: "",
    creditScore: "",
    otherIncome: "",
    assets: "",
  });

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Financial Information</h2>
        <p className="text-sm text-muted-foreground mb-4">
          All adults 18+ must provide income information
        </p>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Income Eligibility Requirements</h3>
        <p className="text-sm mb-3">
          Eligible households have a pre-tax annual income up to 140% of Median Family Income:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div><strong>1 person:</strong> $151,606</div>
          <div><strong>2 people:</strong> $173,264</div>
          <div><strong>3 people:</strong> $194,922</div>
          <div><strong>4 people:</strong> $216,580</div>
          <div><strong>5 people:</strong> $238,238</div>
          <div><strong>6 people:</strong> $259,896</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="applicantIncome">Applicant's Annual Income *</Label>
          <Input
            id="applicantIncome"
            type="number"
            value={formData.applicantIncome}
            onChange={(e) => handleChange("applicantIncome", e.target.value)}
            placeholder="$"
          />
        </div>
        <div>
          <Label htmlFor="householdIncome">Total Household Annual Income *</Label>
          <Input
            id="householdIncome"
            type="number"
            value={formData.householdIncome}
            onChange={(e) => handleChange("householdIncome", e.target.value)}
            placeholder="$"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="monthlyRent">Monthly Rent/Housing Expense</Label>
          <Input
            id="monthlyRent"
            type="number"
            value={formData.monthlyRent}
            onChange={(e) => handleChange("monthlyRent", e.target.value)}
            placeholder="$"
          />
        </div>
        <div>
          <Label htmlFor="desiredHousingExpense">Desired Monthly Housing Expense</Label>
          <Input
            id="desiredHousingExpense"
            type="number"
            value={formData.desiredHousingExpense}
            onChange={(e) => handleChange("desiredHousingExpense", e.target.value)}
            placeholder="$"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="monthlyExpenses">Monthly Expenses Aside from Rent</Label>
        <Textarea
          id="monthlyExpenses"
          value={formData.monthlyExpenses}
          onChange={(e) => handleChange("monthlyExpenses", e.target.value)}
          placeholder="List monthly expenses (food, car notes, student loans, credit cards, etc.)"
          className="min-h-24"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="savingsBalance">Current Savings Account Balance (USD)</Label>
          <Input
            id="savingsBalance"
            type="number"
            value={formData.savingsBalance}
            onChange={(e) => handleChange("savingsBalance", e.target.value)}
            placeholder="$"
          />
        </div>
        <div>
          <Label htmlFor="otherSavings">Other Savings/401K/IRA</Label>
          <Input
            id="otherSavings"
            type="number"
            value={formData.otherSavings}
            onChange={(e) => handleChange("otherSavings", e.target.value)}
            placeholder="$"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="creditScore">Credit Score *</Label>
        <Input
          id="creditScore"
          type="number"
          value={formData.creditScore}
          onChange={(e) => handleChange("creditScore", e.target.value)}
          placeholder="Minimum 620 required"
        />
        <p className="text-xs text-muted-foreground mt-1">
          If below 620, we can refer you to financial literacy partners
        </p>
      </div>

      <div>
        <Label htmlFor="otherIncome">Other Sources of Income</Label>
        <Textarea
          id="otherIncome"
          value={formData.otherIncome}
          onChange={(e) => handleChange("otherIncome", e.target.value)}
          placeholder="VA Pension, Child Support, Social Security, Unemployment, Self-Employment, etc."
          className="min-h-24"
        />
      </div>

      <div>
        <Label htmlFor="assets">Assets</Label>
        <Textarea
          id="assets"
          value={formData.assets}
          onChange={(e) => handleChange("assets", e.target.value)}
          placeholder="Stocks, bonds, trusts, pensions, real estate and their value"
          className="min-h-24"
        />
      </div>
    </div>
  );
};

export default FinancialInfo;
