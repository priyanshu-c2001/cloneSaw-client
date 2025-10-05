import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setSubmitMessage(''); 

        try {
            const response = await fetch("https://clonesaw-server.onrender.com/mail/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitMessage("Message sent successfully! 🎉");
                setFormData({ name: '', email: '', message: '' });
            } else {
                const errorData = await response.json();
                setSubmitMessage(`Error: ${errorData.message || 'Failed to send message.'}`);
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitMessage("An error occurred. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-32 md:py-52">
            <section className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-6">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        {"Create the"} <span className="block">{"future."}</span>
                        <span className="block">{"Contact us."}</span>
                    </h1>
                    <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
                        Get in touch to share your product challenge and we’ll reach out to schedule an intro call.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name*"
                            required
                            className="rounded-none border-0 border-b border-input bg-transparent px-0 text-base focus:outline-none focus-visible:ring-0"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address*"
                            required
                            className="rounded-none border-0 border-b border-input bg-transparent px-0 text-base focus:outline-none focus-visible:ring-0"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message*"
                            required
                            rows={4}
                            className="rounded-none border-0 border-b border-input bg-transparent px-0 text-base focus:outline-none focus-visible:ring-0"
                        />
                    </div>

                    <p className="text-sm text-muted-foreground">
                        By submitting, you agree to Clonesaw’s{" "}
                        <a href="#" className="underline underline-offset-2 hover:text-foreground">Privacy Policy.</a>
                    </p>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-base font-medium text-white transition-opacity ${submitting ? "opacity-70" : "hover:opacity-90"}`}
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>

                    {submitMessage && <p className="mt-2 text-center text-sm">{submitMessage}</p>}

                    <div className="mt-4 rounded-xl bg-pink-200 p-5">
                        <h3 className="mb-1 text-base font-semibold">Important Notice</h3>
                        <p className="text-sm leading-relaxed text-notice-foreground">
                            We&apos;re aware of a scam offering fake positions. These offers are not legitimate. Please block the sender if contacted. Genuine roles are only posted on our website or official LinkedIn account.
                        </p>
                    </div>
                </form>
            </section>

            <hr className="my-16" />

            <section className="grid items-start gap-8 md:grid-cols-[96px,1fr] md:gap-12">
                <div className="h-24 w-24 overflow-hidden rounded-full">
                    <img
                        src="https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"
                        alt="Cole Derby portrait"
                        width="96"
                        height="96"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <blockquote className="text-pretty text-2xl italic leading-snug md:text-3xl lg:text-4xl">
                        “Our team isn&apos;t just about designing products; we&apos;re about creating experiences. We believe that every object, every interaction, should tell a story.”
                    </blockquote>
                    <p className="text-sm text-muted-foreground">Cole Derby, Director of Industrial Design</p>
                </div>
            </section>

            <hr className="my-16" />

            <section className="grid gap-10 md:grid-cols-3">
                <div>
                    <h4 className="mb-4 text-2xl font-semibold">Contact</h4>
                    <ul className="space-y-2">
                        <li><a href="mailto:hello@clonesaw.com" className="underline underline-offset-4">hello@clonesaw.com</a></li>
                        <li><a href="mailto:media@clonesaw.com" className="underline underline-offset-4">media@clonesaw.com</a></li>
                        <li><a href="mailto:newbusiness@clonesaw.com" className="underline underline-offset-4">newbusiness@clonesaw.com</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-2xl font-semibold">Visit</h4>
                    <p className="text-pretty">
                        <a href="#" className="underline underline-offset-4">55 Mississippi Street</a><br />
                        <a href="#" className="underline underline-offset-4">San Francisco, CA 94107</a>
                    </p>
                </div>
                <div>
                    <h4 className="mb-4 text-2xl font-semibold">Follow</h4>
                    <ul className="flex items-center gap-5">
                        <li>
                            <a href="#" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input transition-colors hover:bg-muted">
                                <Instagram className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input transition-colors hover:bg-muted">
                                <Linkedin className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-label="YouTube" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input transition-colors hover:bg-muted">
                                <Youtube className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">YouTube</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default Contact;