export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          additional_income: number | null
          admin_notes: string | null
          agent_email: string | null
          agent_name: string | null
          agent_phone: string | null
          annual_income: number | null
          city: string | null
          created_at: string
          credit_score: number | null
          current_address: string | null
          date_of_birth: string | null
          down_payment_amount: number | null
          drivers_license: string | null
          email: string | null
          employer: string | null
          first_name: string | null
          first_time_buyer: boolean | null
          household_members: Json | null
          id: string
          join_waitlist: boolean | null
          lakeland_connection: boolean | null
          lakeland_details: string | null
          last_name: string | null
          marital_status: string | null
          occupation: string | null
          own_or_rent: string | null
          personal_references: Json | null
          phone: string | null
          pre_approved: boolean | null
          selected_houses: Json | null
          ssn: string | null
          state: string | null
          status: string
          updated_at: string
          user_id: string
          years_at_address: number | null
          years_employed: number | null
          zip_code: string | null
        }
        Insert: {
          additional_income?: number | null
          admin_notes?: string | null
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          credit_score?: number | null
          current_address?: string | null
          date_of_birth?: string | null
          down_payment_amount?: number | null
          drivers_license?: string | null
          email?: string | null
          employer?: string | null
          first_name?: string | null
          first_time_buyer?: boolean | null
          household_members?: Json | null
          id?: string
          join_waitlist?: boolean | null
          lakeland_connection?: boolean | null
          lakeland_details?: string | null
          last_name?: string | null
          marital_status?: string | null
          occupation?: string | null
          own_or_rent?: string | null
          personal_references?: Json | null
          phone?: string | null
          pre_approved?: boolean | null
          selected_houses?: Json | null
          ssn?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          user_id: string
          years_at_address?: number | null
          years_employed?: number | null
          zip_code?: string | null
        }
        Update: {
          additional_income?: number | null
          admin_notes?: string | null
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          credit_score?: number | null
          current_address?: string | null
          date_of_birth?: string | null
          down_payment_amount?: number | null
          drivers_license?: string | null
          email?: string | null
          employer?: string | null
          first_name?: string | null
          first_time_buyer?: boolean | null
          household_members?: Json | null
          id?: string
          join_waitlist?: boolean | null
          lakeland_connection?: boolean | null
          lakeland_details?: string | null
          last_name?: string | null
          marital_status?: string | null
          occupation?: string | null
          own_or_rent?: string | null
          personal_references?: Json | null
          phone?: string | null
          pre_approved?: boolean | null
          selected_houses?: Json | null
          ssn?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          years_at_address?: number | null
          years_employed?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          application_id: string
          created_at: string
          id: string
          is_admin: boolean
          message: string
          sender_id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: string
          is_admin?: boolean
          message: string
          sender_id: string
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: string
          is_admin?: boolean
          message?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          created_at: string
          homeowner_id: string | null
          id: string
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          homeowner_id?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          homeowner_id?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "applicant" | "homeowner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "applicant", "homeowner"],
    },
  },
} as const
