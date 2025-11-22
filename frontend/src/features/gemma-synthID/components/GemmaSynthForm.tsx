import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';

type GemmaSynthFormProps = {
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
};

export const GemmaSynthForm = ({ onSubmit, isLoading }: GemmaSynthFormProps) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onSubmit(prompt);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-4">
            <div className="relative">
                <Textarea
                    placeholder="Enter a prompt to generate text..."
                    value={prompt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                    className="min-h-[120px] p-4 text-lg resize-none bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus:border-primary/50 transition-all"
                />
                <div className="absolute bottom-3 right-3">
                    <Button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className="gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4" />
                        )}
                        Generate
                    </Button>
                </div>
            </div>
        </form>
    );
};
