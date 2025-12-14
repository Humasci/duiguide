"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StateSelector } from "@/components/location/StateSelector";
import { CountySelector } from "@/components/location/CountySelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

// Form validation schema
const intakeFormSchema = z.object({
  // Step 1: Location
  state: z.string().min(1, "Please select your state"),
  county: z.string().min(1, "Please select your county"),
  city: z.string().optional(),

  // Step 2: Timing
  arrestRecency: z.enum(["today", "this_week", "this_month", "older"]),
  arrestDate: z.string().optional(),

  // Step 3: Details
  isFirstOffense: z.boolean(),
  hasAccident: z.boolean(),
  hasInjury: z.boolean(),
  hasCdl: z.boolean(),
  refusedTest: z.boolean().optional(),

  // Step 4: Contact
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  preferredContactMethod: z.enum(["phone", "email", "text"]),
  bestTimeToCall: z.string().optional(),

  // Consent
  consentToContact: z.boolean().refine((val) => val === true, {
    message: "You must consent to be contacted",
  }),
  consentToRecording: z.boolean(),
});

type IntakeFormData = z.infer<typeof intakeFormSchema>;

const STEPS = [
  { id: 1, title: "Location", description: "Where were you arrested?" },
  { id: 2, title: "Timing", description: "When did this happen?" },
  { id: 3, title: "Details", description: "About your case" },
  { id: 4, title: "Contact", description: "How can we reach you?" },
];

export function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      hasAccident: false,
      hasInjury: false,
      hasCdl: false,
      isFirstOffense: true,
      consentToContact: false,
      consentToRecording: false,
      preferredContactMethod: "phone",
    },
  });

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    try {
      // Submit to API
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "web_form",
          sourcePage: window.location.pathname,
          sourceUrl: window.location.href,
          referrer: document.referrer || undefined,
          ...data,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Lead submitted successfully:", result);

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", {
        message: "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof IntakeFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["state", "county"];
        break;
      case 2:
        fieldsToValidate = ["arrestRecency"];
        break;
      case 3:
        fieldsToValidate = ["isFirstOffense", "hasAccident", "hasInjury", "hasCdl"];
        break;
      case 4:
        fieldsToValidate = ["name", "phone", "preferredContactMethod", "consentToContact"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  if (isSuccess) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              Your information has been received. A local DUI attorney will contact
              you shortly to discuss your case.
            </p>
            <p className="text-sm text-muted-foreground">
              What happens next: An attorney will review your information and call
              you within 24 hours to schedule a free consultation.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 ${index !== STEPS.length - 1 ? "pr-4" : ""}`}
            >
              <div className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                    currentStep >= step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {step.id}
                </div>
                {index !== STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                )}
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Location */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State *</FormLabel>
                        <FormControl>
                          <StateSelector
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County *</FormLabel>
                        <FormControl>
                          <CountySelector
                            stateSlug={form.watch("state")}
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Timing */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="arrestRecency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>When were you arrested? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="today" id="today" />
                              <Label htmlFor="today" className="font-normal">
                                Today
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="this_week" id="this_week" />
                              <Label htmlFor="this_week" className="font-normal">
                                Within the past week
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="this_month" id="this_month" />
                              <Label htmlFor="this_month" className="font-normal">
                                Within the past month
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="older" id="older" />
                              <Label htmlFor="older" className="font-normal">
                                More than a month ago
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="arrestDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arrest Date (if known)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          This helps us calculate important deadlines
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("arrestRecency") === "today" && (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Urgent:</strong> You may have only 7-15 days to
                          request a DMV hearing. We&apos;ll help you understand your
                          deadlines.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isFirstOffense"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>This is my first DUI offense</FormLabel>
                          <FormDescription>
                            Check this if you have never been arrested for DUI before
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasAccident"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>There was an accident</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasInjury"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Someone was injured</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasCdl"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I have a commercial driver&apos;s license (CDL)</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Contact */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredContactMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phone" id="phone" />
                              <Label htmlFor="phone" className="font-normal">
                                Phone Call
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="text" id="text" />
                              <Label htmlFor="text" className="font-normal">
                                Text Message
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="email" />
                              <Label htmlFor="email" className="font-normal">
                                Email
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bestTimeToCall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Time to Contact (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Weekday mornings"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentToContact"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I consent to be contacted by local DUI attorneys *
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you agree to be contacted by licensed
                            attorneys in your area regarding your DUI case.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentToRecording"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I consent to call recording (if applicable)
                          </FormLabel>
                          <FormDescription>
                            Calls may be recorded for quality assurance
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {form.formState.errors.root && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <p className="text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                )}

                {currentStep < STEPS.length && (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className={currentStep === 1 ? "ml-auto" : ""}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}

                {currentStep === STEPS.length && (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
