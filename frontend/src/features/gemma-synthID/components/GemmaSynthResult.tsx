import { CheckCircle2, ShieldCheck } from 'lucide-react';

type GemmaSynthResultProps = {
    clean: string;
    watermarked: string;
};

export const GemmaSynthResult = ({ clean, watermarked }: GemmaSynthResultProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto mt-8">
            {/* Clean Response */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3 className="font-medium">Standard Response</h3>
                </div>
                <div className="p-6 rounded-xl bg-muted/30 border border-border/50 min-h-[300px] text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {clean}
                </div>
            </div>

            {/* Watermarked Response */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="font-medium">Watermarked Response (SynthID)</h3>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative p-6 rounded-xl bg-background border border-primary/20 min-h-[300px] text-foreground/90 leading-relaxed whitespace-pre-wrap">
                        {watermarked}
                    </div>
                </div>
            </div>
        </div>
    );
};
