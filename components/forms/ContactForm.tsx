"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { getContactFormSchema, HELP_TYPE_KEYS, type ContactFormValues } from "@/lib/validation/contactSchema";
import { submitLead } from "@/lib/leads/submitLead";
import { analytics } from "@/lib/analytics/events";
import { TextField, TextareaField, SelectField } from "./FormField";
import { TurnstileWidget } from "./TurnstileWidget";
import { Button } from "../ui/Button";
import type { AppLocale } from "@/i18n/routing";

type ContactFormProps = {
  source?: string;
  defaultHelpType?: ContactFormValues["helpType"];
};

/** Formulario de contacto — Fase 13: labels/placeholders/errores vía next-intl, schema de validación resuelto por locale. */
export function ContactForm({ source, defaultHelpType }: ContactFormProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("contactoPage.form");
  const tOptions = useTranslations("contactoPage.helpOptions");

  const [turnstileToken, setTurnstileToken] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [hasStarted, setHasStarted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(getContactFormSchema(locale)),
    defaultValues: { helpType: defaultHelpType, source },
  });

  function handleFirstFocus() {
    if (!hasStarted) {
      analytics.contactStart();
      setHasStarted(true);
    }
  }

  function onSubmit(values: ContactFormValues) {
    setServerError(null);
    startTransition(async () => {
      const result = await submitLead({ ...values, turnstileToken, source, locale });

      if (!result.success) {
        setServerError(result.error);
        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            setError(field as keyof ContactFormValues, { message });
          }
        }
        return;
      }

      analytics.contactSubmit({ helpType: values.helpType, source });
      setSuccess(true);
    });
  }

  if (success) {
    return (
      <div className="rounded-card bg-dta-blue-100 border border-dta-blue-100 p-6 text-center">
        <CheckCircle2 size={28} className="text-dta-blue-600 mx-auto mb-2" aria-hidden="true" />
        <div className="font-bold text-dta-black">{t("successTitle")}</div>
        <p className="text-sm text-dta-gray-600 mt-1">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFirstFocus} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label={t("fullName")} required placeholder={t("fullNamePlaceholder")} error={errors.fullName?.message} {...register("fullName")} />
        <TextField label={t("company")} required placeholder={t("companyPlaceholder")} error={errors.company?.message} {...register("company")} />
      </div>

      <TextField label={t("email")} type="email" required placeholder={t("emailPlaceholder")} error={errors.email?.message} {...register("email")} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label={t("phone")} type="tel" placeholder="+52 998 123 4567" error={errors.phone?.message} {...register("phone")} />
        <TextField label={t("city")} placeholder={t("cityPlaceholder")} error={errors.city?.message} {...register("city")} />
      </div>

      <SelectField label={t("helpType")} required error={errors.helpType?.message} {...register("helpType")}>
        <option value="">{t("helpTypePlaceholder")}</option>
        {HELP_TYPE_KEYS.map((key) => (
          <option key={key} value={key}>
            {tOptions(key)}
          </option>
        ))}
      </SelectField>

      <TextareaField label={t("message")} required rows={4} placeholder={t("messagePlaceholder")} error={errors.message?.message} {...register("message")} />

      <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <Button type="submit" variant="primary" disabled={isPending || !turnstileToken}>
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
