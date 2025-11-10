import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchApplications();
  }, [isAdmin, navigate]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          *,
          profiles:user_id (
            email,
            full_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async () => {
    if (!selectedApp || !newStatus) return;

    try {
      const { error } = await supabase
        .from("applications")
        .update({
          status: newStatus,
          admin_notes: adminNotes || null,
        })
        .eq("id", selectedApp.id);

      if (error) throw error;

      // If approved, add homeowner role
      if (newStatus === "approved") {
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert([{
            user_id: selectedApp.user_id,
            role: "homeowner"
          }]);

        if (roleError && !roleError.message.includes("duplicate")) {
          throw roleError;
        }
      }

      toast.success("Application status updated successfully");
      setSelectedApp(null);
      setNewStatus("");
      setAdminNotes("");
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update application status");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "outline",
      submitted: "default",
      under_review: "secondary",
      pending_info: "outline",
      ready_for_match: "default",
      approved: "default",
      rejected: "destructive",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Applications</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="under_review">Under Review</TabsTrigger>
              <TabsTrigger value="ready">Ready for Match</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {applications.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No applications yet</p>
                  </CardContent>
                </Card>
              ) : (
                applications.map((app) => (
                  <Card key={app.id} className="border-2 rounded-[25px]">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>
                              {app.first_name} {app.last_name}
                            </CardTitle>
                            <CardDescription>{app.email}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{app.phone || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Applied On</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Annual Income</p>
                          <p className="text-sm text-muted-foreground">
                            ${app.annual_income?.toLocaleString() || "N/A"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedApp(app);
                          setNewStatus(app.status);
                          setAdminNotes(app.admin_notes || "");
                        }}
                      >
                        Manage Application
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="submitted">
              {applications.filter(app => app.status === "submitted").map((app) => (
                <Card key={app.id} className="border-2 rounded-[25px]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{app.first_name} {app.last_name}</CardTitle>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" onClick={() => setSelectedApp(app)}>
                      Review Application
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="under_review">
              {applications.filter(app => app.status === "under_review").map((app) => (
                <Card key={app.id} className="border-2 rounded-[25px]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{app.first_name} {app.last_name}</CardTitle>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" onClick={() => setSelectedApp(app)}>
                      Manage Application
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ready">
              {applications.filter(app => app.status === "ready_for_match").map((app) => (
                <Card key={app.id} className="border-2 rounded-[25px]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{app.first_name} {app.last_name}</CardTitle>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" onClick={() => setSelectedApp(app)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Application Management Modal */}
          {selectedApp && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Manage Application - {selectedApp.first_name} {selectedApp.last_name}</CardTitle>
                  <CardDescription>Update application status and add notes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Status: {getStatusBadge(selectedApp.status)}</Label>
                  </div>
                  <div>
                    <Label htmlFor="status">Update Status</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="pending_info">Pending Additional Info</SelectItem>
                        <SelectItem value="ready_for_match">Ready for Match</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Admin Notes</Label>
                    <Textarea
                      id="notes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add notes for the applicant..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={updateApplicationStatus} className="flex-1">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Update Status
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedApp(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
