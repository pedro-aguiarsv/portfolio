"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ensureToaster } from "@/components/deferred-toaster"
import { getCopy, profile, type Locale } from "@/data/site"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const fieldClass =
  "h-12 rounded-none border-foreground/25 bg-transparent text-base text-foreground placeholder:text-foreground/55 focus-visible:border-highlighter focus-visible:ring-highlighter/25 md:text-base"

export function Contact({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).contact
  const [sent, setSent] = useState(false)

  const schema = z.object({
    name: z.string().trim().min(2, copy.errors.name),
    email: z.email(copy.errors.email),
    message: z.string().trim().min(8, copy.errors.message),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  })

  async function onSubmit(values: { name: string; email: string; message: string }) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const [emailjs] = await Promise.all([import("@emailjs/browser"), ensureToaster()])
    const { toast } = await import("sonner")

    if (!serviceId || !templateId || !publicKey) {
      toast.error(copy.errors.send)
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
          reply_to: values.email,
        },
        { publicKey },
      )
    } catch {
      toast.error(copy.errors.send)
      return
    }

    setSent(true)
    toast.success(copy.toast)
  }

  const links = [
    { label: "E-mail", href: `mailto:${profile.email}`, value: profile.email },
    { label: "WhatsApp", href: profile.phoneHref, value: profile.phone },
    { label: "LinkedIn", href: profile.linkedin, value: "pedroaguiargouvea" },
    { label: "GitHub", href: profile.github, value: "pedro-aguiarsv" },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-14 border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs tracking-[0.2em] text-highlighter uppercase">
            {copy.kicker}
          </p>
          <h2
            id="contact-title"
            className="mt-4 text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-4 max-w-sm text-base text-muted-foreground md:text-lg">{copy.lead}</p>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="flex min-h-12 items-center justify-between gap-4 py-2 hover:text-highlighter"
                >
                  <span className="font-mono text-xs tracking-[0.16em] uppercase">
                    {link.label}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">{link.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-border bg-card px-6 py-8 text-foreground md:px-10 md:py-10 lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div aria-live="polite">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{copy.done.title}</h3>
              <p className="mt-3 text-muted-foreground">{copy.done.body}</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{copy.formTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{copy.support}</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-8 space-y-5"
                  noValidate
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                          {copy.fields.name}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="name"
                            placeholder={copy.placeholders.name}
                            className={fieldClass}
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
                        <FormLabel className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                          {copy.fields.email}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            autoComplete="email"
                            placeholder={copy.placeholders.email}
                            className={fieldClass}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                          {copy.fields.message}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder={copy.placeholders.message}
                            className={`${fieldClass} min-h-32 py-3`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="h-12 rounded-none px-5 text-sm font-medium hover:bg-[#8aeeff]"
                  >
                    {form.formState.isSubmitting ? copy.sending : copy.send}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
      </div>
    </section>
  )
}
