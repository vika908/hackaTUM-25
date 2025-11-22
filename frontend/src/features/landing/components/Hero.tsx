import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Sparkles, Activity } from 'lucide-react';

export const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 bg-gradient-to-b from-background to-muted/20">
            <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-muted/50 text-sm font-medium text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>Next Gen AI Security</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 max-w-4xl">
                Protect Your AI Generated Content with <span className="text-primary">Invisible Watermarks</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                Secure your intellectual property. Our open-source solution embeds robust, invisible watermarks into AI-generated text and images, ensuring authenticity and traceability.
            </p>
            <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Start Watermarking
                </Button>
                <Button variant="outline" size="lg">
                    View on GitHub
                </Button>
                <Button variant="ghost" size="lg" asChild>
                    <Link to="/health">
                        <Activity className="w-4 h-4 mr-2" />
                        System Status
                    </Link>
                </Button>
            </div>
        </div>
    );
};
