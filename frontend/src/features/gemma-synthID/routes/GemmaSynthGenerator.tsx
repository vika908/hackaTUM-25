import { useState } from 'react';
import { GemmaSynthForm } from '../components/GemmaSynthForm';
import { GemmaSynthResult } from '../components/GemmaSynthResult';
import { getWatermarkComparison } from '../api/gemma-synthID';
import { Fingerprint } from 'lucide-react';

export const GemmaSynthGenerator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ clean: string; watermarked: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (prompt: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getWatermarkComparison({ prompt });
            setResult(response);
        } catch (err) {
            console.error(err);
            setError('Failed to generate watermarked text. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
                        <Fingerprint className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Gemma <span className="text-primary">SynthID</span> Generator
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience the power of invisible watermarking. Generate text and see how SynthID embeds undetectable signatures without compromising quality.
                    </p>
                </div>

                <GemmaSynthForm onSubmit={handleGenerate} isLoading={isLoading} />

                {error && (
                    <div className="mt-8 p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                        {error}
                    </div>
                )}

                {result && (
                    <GemmaSynthResult
                        clean={result.clean}
                        watermarked={result.watermarked}
                    />
                )}
            </div>
        </div>
    );
};
