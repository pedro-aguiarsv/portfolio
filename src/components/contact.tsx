"use client"

import { useState, type ComponentType, type ReactNode } from "react"
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
  "h-12 rounded-none border-ink/25 bg-transparent text-base text-ink placeholder:text-ink/45 focus-visible:border-ink focus-visible:ring-ink/20 md:text-base"

export function Contact({ locale }: { locale: Locale }) {
  const page = getCopy(locale)
  const copy = page.contact
  const [sent, setSent] = useState(false)
  const [Stamp, setStamp] = useState<ComponentType<{ children: ReactNode }> | null>(null)

  const schema = z.object({
    name: z.string().trim().min(2, copy.errors.name),
    email: z.email(copy.errors.email),
    message: z.string().trim().min(8, copy.errors.message),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  })

  async function onSubmit() {
    const [stampMod] = await Promise.all([
      import("@/components/stamp"),
      new Promise((resolve) => setTimeout(resolve, 700)),
      ensureToaster(),
    ])
    // TODO Sprint 02: EmailJS
    setStamp(() => stampMod.Stamp)
    setSent(true)
    const { toast } = await import("sonner")
    toast.success(copy.toast)
  }

  const links = [
    { label: "E-mail", href: `mailto:${profile.email}`, value: profile.email },
    { label: "WhatsApp", href: profile.phoneHref, value: profile.phone },
    { label: "LinkedIn", href: profile.linkedin, value: "pedroaguiargouvea" },
    { label: "GitHub", href: profile.github, value: "pedro-aguiarsv" },
  ]

  return (
    <section id="conversao" className="scroll-mt-24 px-5 py-24 md:py-32 md:pr-14 md:pl-28">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.2em] text-highlighter uppercase">
            {copy.kicker}
          </p>
          <h2 className="mt-6 font-serif text-5xl leading-[0.9] font-normal tracking-[-0.04em] md:text-7xl">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-sm text-muted-foreground">{copy.lead}</p>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="flex items-baseline justify-between gap-4 py-3 hover:text-highlighter"
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase">
                    {link.label}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">{link.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-paper px-6 py-8 text-ink md:px-10 md:py-12 lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div aria-live="polite">
              {Stamp ? (
                <Stamp>{copy.receipt.title}</Stamp>
              ) : (
                <p className="stamp-in inline-block border-[3px] border-stamp px-3 py-1 font-mono text-sm tracking-[0.18em] text-stamp uppercase">
                  {copy.receipt.title}
                </p>
              )}
              <dl className="mt-8 space-y-2 font-mono text-xs tracking-[0.08em] uppercase">
                <div className="flex justify-between gap-4">
                  <dt>{copy.receipt.event}</dt>
                  <dd>{copy.receipt.eventValue}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{copy.receipt.source}</dt>
                  <dd>{copy.receipt.sourceValue}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{copy.receipt.reply}</dt>
                  <dd>{copy.receipt.replyValue}</dd>
                </div>
              </dl>
              <p className="mt-8 font-serif text-2xl leading-snug italic">{copy.receipt.body}</p>
              <p className="mt-4 text-sm text-ink/70">{copy.receipt.note}</p>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-3xl">{copy.formTitle}</h3>
              <p className="mt-2 text-sm text-ink/70">{copy.support}</p>
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
                        <FormLabel className="font-mono text-[11px] tracking-[0.14em] text-ink uppercase">
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
                        <FormLabel className="font-mono text-[11px] tracking-[0.14em] text-ink uppercase">
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
                        <FormLabel className="font-mono text-[11px] tracking-[0.14em] text-ink uppercase">
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
                    className="h-12 rounded-none bg-ink px-5 font-mono text-xs tracking-[0.14em] text-paper uppercase hover:bg-ink/85"
                  >
                    {form.formState.isSubmitting ? copy.sending : page.cta}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
