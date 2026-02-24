import "./globals.css";

export const metadata = {
    title: "AI Learning Navigator",
    description: "An adaptive, visual roadmap for self-guided learning.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
