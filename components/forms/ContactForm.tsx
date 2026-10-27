"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, AlertCircle } from "lucide-react";
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

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [hasStarted, setHasStarted] = useState(false);
  // Sin site key (desarrollo / aún sin configurar) TurnstileWidget no renderiza el
  // desafío y nunca entrega token: exigirlo dejaba el botón deshabilitado para siempre.
  const turnstileRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(getContactFormSchema(locale)),
    // El token de Turnstile vive en el estado del formulario: el esquema lo exige y,
    // al no ser un input registrado, antes nunca llegaba y la validación fallaba siempre.
    // Sin site key (desarrollo) se manda un valor fijo; el servidor ya omite la verificación
    // en ese caso (ver lib/leads/verifyTurnstile.ts) y en producción la rechaza.
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      city: "",
      message: "",
      helpType: defaultHelpType,
      source,
      turnstileToken: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? "" : "dev-no-turnstile",
    },
  });
  const turnstileToken = watch("turnstileToken");

  function handleFirstFocus() {
    if (!hasStarted) {
      analytics.contactStart();
      setHasStarted(true);
    }
  }

  function onSubmit(values: ContactFormValues) {
    setServerError(null);
    startTransition(async () => {
      const result = await submitLead({ ...values, source, locale });

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
      <div role="status" className="rounded-card border border-dta-blue-100 bg-dta-blue-50 p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-dta-blue-600 text-white shadow-sm">
          <CheckCircle2 size={28} aria-hidden="true" />
        </div>
        <div className="text-lg font-bold text-dta-black">{t("successTitle")}</div>
        <p className="mt-2 text-sm leading-relaxed text-dta-gray-600">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFirstFocus} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label={t("fullName")} required placeholder={t("fullNamePlaceholder")} error={errors.fullName?.message} {...register("fullName")} />
        <TextField label={t("company")} required placeholder={t("companyPlaceholder")} error={errors.company?.message} {...register("company")} />
      </div>

      <TextField label={t("email")} type="email" required placeholder={t("emailPlaceholder")} error={errors.email?.message} {...register("email")} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label={t("phone")} type="tel" placeholder="+52 000 000 0000" error={errors.phone?.message} {...register("phone")} />
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

      <TurnstileWidget
        onVerify={(token) => setValue("turnstileToken", token, { shouldValidate: false })}
        onExpire={() => setValue("turnstileToken", "", { shouldValidate: false })}
      />

      {serverError && (
        <p role="alert" className="flex items-start gap-2 rounded-input border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={isPending || (turnstileRequired && !turnstileToken)} className="w-full sm:w-auto" showArrow={!isPending}>
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
