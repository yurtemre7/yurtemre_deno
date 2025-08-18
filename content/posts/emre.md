---
title: "Emre"
date: 2025-08-18
excerpt: "Who am I and what do I do?"
---

## Who am I?

I am a young developer based in Berlin. Having worked with Flutter and Dart for the last 4 years, I've acquired a ton of experience in mobile app development. I know the best practices, helped found them myself and I am still learning till this day.

## My Dream

My dream is it to build with that foundation that I've created the best applications possible. Always striving to improve from sprint to sprint. Thanks to the *Ära* (age) of AI everyday workflows are speed up, developers can start projects much faster but at the cost of quality and uniqueness. **I am here to counteract that.**

## My Stack

I use
- Flutter
- Dart
- Fresh
- TypeScript
- TailwindCSS
- Preact
- React
- Deno
- Next.js
- Firebase

And those tools have enabled me to build full stack applications.

The most proud application yet is [Paren](/paren), which enabled fast currency conversions in your vacation to help you *exactly when you need it*.

## Code Example

As for coding example, I'll provide you the code of my little stock market prediction algorithm, which is pure regression based.

```dart
List<({double x, double y})> calculatePrediction(
    List<({double x, double y})> historicalData,
  ) {
    predictionDuration.value = localDuration.value ~/ 3;

    if (historicalData.length < 2) return [];

    // Calculate average daily change (drift) and volatility (stdDev)
    double totalChange = 0;
    double totalChangeSquared = 0;
    for (int i = 1; i < historicalData.length; i++) {
      double change = historicalData[i].y - historicalData[i - 1].y;
      totalChange += change;
      totalChangeSquared += change * change;
    }
    int n = historicalData.length - 1;
    double avgDailyChange = totalChange / n;
    double variance =
        (totalChangeSquared / n) - (avgDailyChange * avgDailyChange);
    variance = max(variance, 0);
    double stdDev = sqrt(variance).toDouble();

    var lastX = historicalData.last.x;
    var lastY = historicalData.last.y;
    var step = Duration.millisecondsPerDay.toDouble();

    // Generate predictions with random noise
    Random random =
        Random(); // Seed with a fixed value for consistency if needed
    List<({double x, double y})> prediction = [];
    double currentY = lastY;
    for (int i = 0; i < predictionDuration.value.inDays; i++) {
      double newX = lastX + (i + 1) * step;
      double noise = (random.nextDouble() * 2 - 1) *
          stdDev *
          0.5; // Noise scaled by 50% of volatility
      double newY = currentY + avgDailyChange + noise;
      prediction.add((x: newX, y: newY));
      currentY = newY;
    }
    // add the last historical point to the prediction
    prediction.insert(0, historicalData.last);
    return prediction;
  }
```

I hope you enjoyed reading this introduction. Thank you for being here.

Best regards,
Emre Yurtseven

