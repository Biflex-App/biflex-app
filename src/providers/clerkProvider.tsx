import { ClerkProvider as ClerkProviderOG } from "@clerk/nextjs"
import { neobrutalism } from "@clerk/themes";

export default function ClerkProvider ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderOG
      appearance={{
        baseTheme: [neobrutalism],
        variables: {
          colorPrimary: "#7A83FF",
          colorBackground: "#FFFFFF",
          colorInputBackground: "#FFFFFF",
          colorText: "#000000",
          colorTextSecondary: "#666666",
          colorTextOnPrimaryBackground: "#000000",
          borderRadius: "0px",
        },
      }}
    >
      {children}
    </ClerkProviderOG>
  );
}
