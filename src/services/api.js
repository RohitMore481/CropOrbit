export const runStressAnalysis = async (selectedFields = []) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockResult = {
                summary: {
                    health_score: 0,
                    stress_percentage: 0,
                },
                fields: {}
            };

            let totalStressSum = 0;
            let totalCellsCount = 0;

            selectedFields.forEach(field => {
                // Generate 10x10 stress matrix
                const matrix = Array(10).fill(0).map(() =>
                    Array(10).fill(0).map(() => Math.random() < 0.3 ? (Math.random() * 0.4 + 0.6) : Math.random() * 0.4) // Skewed towards 0 with occasional hot spots
                );

                // Calculate field metrics dynamically from matrix
                const flatMatrix = matrix.flat();
                const fieldStressSum = flatMatrix.reduce((sum, val) => sum + val, 0);
                const fieldAvgStress = fieldStressSum / flatMatrix.length;

                totalStressSum += fieldStressSum;
                totalCellsCount += flatMatrix.length;

                mockResult.fields[field] = {
                    stress_matrix: matrix,
                    metrics: {
                        area_under_stress: (fieldAvgStress * 5).toFixed(1), // Mock relation to area
                        avg_temperature: Math.floor(Math.random() * 8) + 26 + (fieldAvgStress * 10), // Temp correlation
                        confidence: (Math.random() * 0.15 + 0.85).toFixed(2), // 0.85 - 1.00
                        stress_percentage: Math.round(fieldAvgStress * 100)
                    }
                };
            });

            // Compute overall summary dynamically
            if (totalCellsCount > 0) {
                const overallAvgStress = totalStressSum / totalCellsCount;
                mockResult.summary.stress_percentage = Math.round(overallAvgStress * 100);
                mockResult.summary.health_score = 100 - mockResult.summary.stress_percentage;
            } else {
                mockResult.summary.health_score = 100;
                mockResult.summary.stress_percentage = 0;
            }

            resolve(mockResult);
        }, 2000);
    });
};
