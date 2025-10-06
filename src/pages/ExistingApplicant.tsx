import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

const ExistingApplicant = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">
            Existing Applicant Portal
          </h1>

          <Card className="border-2 rounded-[25px] shadow-lg">
            <CardHeader>
              <CardTitle>Check Your Application Status</CardTitle>
              <CardDescription>
                Enter your email address to view your application status and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                />
              </div>
              <Button className="w-full rounded-full">
                <Search className="mr-2 h-4 w-4" />
                View Application
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Need assistance? Contact us at info@communitypreservationtrust.org</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExistingApplicant;
