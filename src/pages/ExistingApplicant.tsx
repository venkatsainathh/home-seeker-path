import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit, MessageSquare, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ExistingApplicant = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [application, setApplication] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!user) return;

      try {
        // Fetch application
        const { data: appData, error: appError } = await supabase
          .from("applications")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (appError) throw appError;
        setApplication(appData);

        // Fetch messages
        const { data: msgData, error: msgError } = await supabase
          .from("messages")
          .select("*")
          .eq("application_id", appData.id)
          .order("created_at", { ascending: true });

        if (!msgError) {
          setMessages(msgData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load application");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [user]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !application) return;

    setSending(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{
          application_id: application.id,
          sender_id: user?.id,
          message: newMessage,
          is_admin: false
        }])
        .select()
        .single();

      if (error) throw error;

      setMessages([...messages, data]);
      setNewMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          icon: Clock,
          color: "text-blue-500",
          title: "Application Submitted",
          description: "Your application has been submitted and is awaiting review",
          progress: 25
        };
      case "under_review":
        return {
          icon: Clock,
          color: "text-yellow-500",
          title: "Under Review",
          description: "Your application is currently being reviewed by our team",
          progress: 50
        };
      case "pending_info":
        return {
          icon: AlertCircle,
          color: "text-orange-500",
          title: "Additional Information Required",
          description: "Please check the messages below and provide the requested information",
          progress: 50
        };
      case "ready_for_match":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          title: "Ready for Matching",
          description: "Your application has been approved! You can now select your property preferences",
          progress: 75
        };
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          title: "Application Approved",
          description: "Congratulations! You've been approved for homeownership",
          progress: 100
        };
      default:
        return {
          icon: FileText,
          color: "text-muted-foreground",
          title: "Application Status",
          description: "View your application status",
          progress: 0
        };
    }
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

  if (!application) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>No Application Found</CardTitle>
              <CardDescription>You haven't submitted an application yet.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/new-applicant")}>
                Start Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const statusInfo = getStatusInfo(application.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-primary">Application Status</h1>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>

          {/* Status Card */}
          <Card className="border-2 rounded-[25px] shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <StatusIcon className={`h-8 w-8 ${statusInfo.color}`} />
              </div>
              <CardTitle className="text-2xl">{statusInfo.title}</CardTitle>
              <CardDescription>{statusInfo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Application Progress</span>
                    <span>{statusInfo.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${statusInfo.progress}%` }}
                    />
                  </div>
                </div>
                {application.admin_notes && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                    <p className="text-sm font-medium mb-1">Notes from CPT Staff:</p>
                    <p className="text-sm text-muted-foreground">{application.admin_notes}</p>
                  </div>
                )}
                <div className="flex gap-4">
                  {application.status !== "approved" && application.status !== "rejected" && (
                    <Button
                      variant="outline"
                      onClick={() => navigate("/new-applicant")}
                      className="flex-1"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Review/Edit Application
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages Card */}
          <Card className="border-2 rounded-[25px] shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages with CPT Staff
              </CardTitle>
              <CardDescription>
                Communicate with our team about your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No messages yet. Send a message to start the conversation.
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg ${
                        msg.is_admin
                          ? "bg-accent/10 border border-accent/30"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium">
                          {msg.is_admin ? "CPT Staff" : "You"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Send a message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="w-full"
                >
                  {sending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ExistingApplicant;
