export const runStressAnalysis = (selectedFields) => {
    return new Promise((resolve) => {
  
      setTimeout(() => {
  
        const result = {
          summary: {
            health_score: 0,
            stress_percentage: 0
          },
          fields: {}
        };
  
        let totalStress = 0;
        let totalPixels = 0;
  
        selectedFields.forEach((fieldId) => {
  
          const gridSize = 25; // higher resolution
          const stress_matrix = [];
  
          // Random hotspot centers
          const hotspot1 = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize,
            intensity: 0.6 + Math.random() * 0.4
          };
  
          const hotspot2 = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize,
            intensity: 0.5 + Math.random() * 0.3
          };
  
          let fieldStressSum = 0;
  
          for (let i = 0; i < gridSize; i++) {
            const row = [];
  
            for (let j = 0; j < gridSize; j++) {
  
              // 🌊 Base gradient (center less stressed, edges more stressed)
              const centerDist = Math.sqrt(
                Math.pow(i - gridSize / 2, 2) +
                Math.pow(j - gridSize / 2, 2)
              ) / (gridSize / 2);
  
              let gradientStress = centerDist * 0.4;
  
              // 🔥 Hotspot 1
              const dist1 = Math.sqrt(
                Math.pow(i - hotspot1.x, 2) +
                Math.pow(j - hotspot1.y, 2)
              );
  
              const hotspotStress1 =
                hotspot1.intensity * Math.exp(-dist1 / 5);
  
              // 🔥 Hotspot 2
              const dist2 = Math.sqrt(
                Math.pow(i - hotspot2.x, 2) +
                Math.pow(j - hotspot2.y, 2)
              );
  
              const hotspotStress2 =
                hotspot2.intensity * Math.exp(-dist2 / 6);
  
              // 🌿 Combine
              let stressValue =
                gradientStress +
                hotspotStress1 +
                hotspotStress2;
  
              // Normalize between 0 and 1
              stressValue = Math.min(Math.max(stressValue, 0), 1);
  
              row.push(stressValue);
              fieldStressSum += stressValue;
              totalStress += stressValue;
              totalPixels++;
            }
  
            stress_matrix.push(row);
          }
  
          const avgFieldStress = fieldStressSum / (gridSize * gridSize);
  
          result.fields[fieldId] = {
            stress_matrix,
            metrics: {
              avg_stress: avgFieldStress.toFixed(2),
              area_under_stress: (avgFieldStress * 100).toFixed(1),
              avg_temperature: (28 + Math.random() * 4).toFixed(1),
              confidence: (0.85 + Math.random() * 0.1).toFixed(2)
            }
          };
        });
  
        const avgStress = totalStress / totalPixels;
  
        result.summary.health_score = Math.round((1 - avgStress) * 100);
        result.summary.stress_percentage = Math.round(avgStress * 100);
  
        resolve(result);
  
      }, 1500);
    });
  };