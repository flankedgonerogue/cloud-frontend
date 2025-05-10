import clsx from "clsx";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FlowState } from "./customer-details";
import { useTranslations } from "next-intl";

const postalCodePatterns: Record<string, RegExp> = {
  AT: /^\d{4}$/,
  BE: /^\d{4}$/,
  BG: /^\d{4}$/,
  HR: /^\d{5}$/,
  CY: /^\d{4}$/,
  CZ: /^\d{3} ?\d{2}$/,
  DK: /^\d{4}$/,
  EE: /^\d{5}$/,
  FI: /^\d{5}$/,
  FR: /^\d{5}$/,
  DE: /^\d{5}$/,
  GR: /^\d{5}$/,
  HU: /^\d{4}$/,
  IE: /^[A-Z0-9]{3} ?[A-Z0-9]{4}$/,
  IT: /^\d{5}$/,
  LV: /^LV-\d{4}$/,
  LT: /^LT-\d{5}$/,
  LU: /^\d{4}$/,
  MT: /^[A-Z]{3} ?\d{4}$/,
  NL: /^\d{4} ?[A-Z]{2}$/,
  PL: /^\d{2}-\d{3}$/,
  PT: /^\d{4}-\d{3}$/,
  RO: /^\d{6}$/,
  SK: /^\d{3} ?\d{2}$/,
  SI: /^\d{4}$/,
  ES: /^\d{5}$/,
  SE: /^\d{3} ?\d{2}$/,
};

const useCustomerDetailForm = () => {
  const t = useTranslations("checkout.customerDetails");

  const formSchema = z.object({
    first_name: z
      .string()
      .min(2, t("form.firstNameLengthError"))
      .regex(/^(?!\d+$)[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\-'’.°ºᵃª ]+$/, t("form.firstNameInvalidError")),
    last_name: z
      .string()
      .min(2, t("form.lastNameLengthError"))
      .regex(/^(?!\d+$)[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\-'’.°ºᵃª ]+$/, t("form.lastNameInvalidError")),
    email: z.string().email(t("form.emailInvalidError")),
    address: z
      .object({
        street_address: z.string().min(2, t("form.streetAddressRequired")),
        postal_code: z.string().min(2, t("form.postalCodeRequired")),
        city: z.string().min(2, t("form.cityRequired")),
        country: z
          .string({
            required_error: t("form.countryRequired"),
          })
          .length(2, t("form.countryInvalid")),
      })
      .superRefine((data, ctx) => {
        const code = data.country.toUpperCase();
        const pattern = postalCodePatterns[code];
        if (pattern && !pattern.test(data.postal_code)) {
          ctx.addIssue({
            path: ["postal_code"],
            message: t("form.postalCodeFormatInvalid", { code }),
            code: z.ZodIssueCode.custom,
          });
        }
      }),
    phone: z.string().refine(
      (val) => {
        const phone = parsePhoneNumberFromString(val);
        return phone?.isValid();
      },
      {
        message: t("form.phoneInvalid"),
      },
    ),
  });

  return formSchema;
};

export type FormSchema = z.infer<ReturnType<typeof useCustomerDetailForm>>;

interface CustomerDetailsFormProps {
  onSubmit: (data: FormSchema) => void;
  flowState: FlowState;
  buttonMsg: string;
}

const CustomerDetailsForm: FC<CustomerDetailsFormProps> = ({ onSubmit, flowState, buttonMsg }) => {
  const t = useTranslations("checkout.customerDetails");
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(useCustomerDetailForm()),
  });

  return (
    <form
      id="customer-details-container"
      className="text-primary flex w-full flex-col gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <h1 className="text-4xl font-bold">{t("form.title")}</h1>

      <div className="space-y-2">
        <Label htmlFor="first-name" className={clsx(errors.first_name && "text-red-500")}>
          {t("form.firstNameLabel")}
        </Label>
        <Input
          id="first-name"
          placeholder={t("form.firstNamePlaceholder")}
          autoComplete="given-name"
          {...register("first_name")}
          disabled={flowState != FlowState.Ready}
        />
        {errors.first_name && <p className="text-sm text-red-500">{errors.first_name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="last-name" className={clsx(errors.last_name && "text-red-500")}>
          {t("form.lastNameLabel")}
        </Label>
        <Input
          id="last-name"
          placeholder={t("form.lastNamePlaceholder")}
          autoComplete="family-name"
          {...register("last_name")}
          disabled={flowState != FlowState.Ready}
        />
        {errors.last_name && <p className="text-sm text-red-500">{errors.last_name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className={clsx(errors.email && "text-red-500")}>
          {t("form.emailLabel")}
        </Label>
        <Input
          id="email"
          placeholder={t("form.emailPlaceholder")}
          autoComplete="email"
          {...register("email")}
          disabled={flowState != FlowState.Ready}
        />
        <p className="text-sm text-white/50">{t("form.emailHint")}</p>
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="street-address" className={clsx(errors.address?.street_address && "text-red-500")}>
          {t("form.streetAddressLabel")}
        </Label>
        <Input
          id="street-address"
          placeholder={t("form.streetAddressPlaceholder")}
          autoComplete="street-address"
          {...register("address.street_address")}
          disabled={flowState != FlowState.Ready}
        />
        {errors.address?.street_address && (
          <p className="text-sm text-red-500">{errors.address.street_address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="postal-code" className={clsx(errors.address?.postal_code && "text-red-500")}>
          {t("form.postalCodeLabel")}
        </Label>
        <Input
          id="postal-code"
          placeholder={t("form.postalCodePlaceholder")}
          autoComplete="postal-code"
          {...register("address.postal_code")}
          disabled={flowState != FlowState.Ready}
        />
        {errors.address?.postal_code && <p className="text-sm text-red-500">{errors.address.postal_code.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className={clsx(errors.address?.city && "text-red-500")}>
          {t("form.cityLabel")}
        </Label>
        <Input
          id="city"
          placeholder={t("form.cityPlaceholder")}
          autoComplete="address-level2"
          {...register("address.city")}
          disabled={flowState != FlowState.Ready}
        />
        {errors.address?.city && <p className="text-sm text-red-500">{errors.address.city.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className={clsx(errors.address?.country && "text-red-500")}>
          {t("form.countryLabel")}
        </Label>
        <Select
          defaultValue=""
          disabled={flowState != FlowState.Ready}
          onValueChange={(value) => setValue("address.country", value, { shouldValidate: true })}
          autoComplete="country"
        >
          <SelectTrigger
            id="country"
            className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-white"
          >
            <SelectValue placeholder={t("form.countryPlaceholder")} />
          </SelectTrigger>
          <SelectContent className="bg-alternative text-white">{/* countries... unchanged */}</SelectContent>
        </Select>
        {errors.address?.country && <p className="text-sm text-red-500">{errors.address.country.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className={clsx(errors.phone && "text-red-500")}>
          {t("form.phoneLabel")}
        </Label>
        <Input
          id="phone"
          placeholder={t("form.phonePlaceholder")}
          autoComplete="tel"
          {...register("phone")}
          disabled={flowState != FlowState.Ready}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      <button
        type="submit"
        className={clsx(
          "transition-color rounded-lg px-4 py-2 duration-150",
          flowState != FlowState.Ready && "cursor-not-allowed bg-white/10 text-white/50",
          flowState == FlowState.FailedToAuthorizePayment && "cursor-not-allowed bg-red-700 hover:bg-red-500",
          flowState == FlowState.Ready && "cursor-pointer bg-white/20 text-white hover:bg-white/40",
        )}
        onClick={(e) => {
          if (flowState != FlowState.Ready) e.preventDefault();
        }}
      >
        {buttonMsg}
      </button>

      <div id="klarna-payments-container" className="my-2 min-h-max w-full rounded-lg bg-white text-white" />
    </form>
  );
};

export default CustomerDetailsForm;
