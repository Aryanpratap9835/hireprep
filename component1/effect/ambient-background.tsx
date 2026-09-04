/**
 * Fixed ambient background for the whole app shell.
 *
 * Layered radial gradients + a faint grid create spatial depth behind the UI.
 * Purely decorative, non-interactive, and static (no continuous JS), so it
 * stays cheap while giving the interface a premium, lit-from-within feel.
 */
export default function AmbientBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
            {/* Base vertical wash */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[oklch(0.13_0.02_264)]" />

            {/* Top-left azure bloom */}
            <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[var(--glow-primary)] blur-[120px]" />

            {/* Right-side cool light */}
            <div className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[var(--glow-soft)] blur-[120px]" />

            {/* Faint dot grid for texture */}
            <div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "radial-gradient(oklch(1 0 0 / 4%) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
                }}
            />
        </div>
    );
}
