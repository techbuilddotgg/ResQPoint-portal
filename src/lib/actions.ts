'use server';

import { DataPoint } from '@/lib/types';

export async function getDataPoints() {
  const points: DataPoint[] = [];

  // Define hotspot center
  const hotspotCenter = { longitude: 14.9, latitude: 46.45 };
  const hotspotRadius = 0.005; // Slightly larger radius for clustering
  const clusterCount = 5; // Number of clusters
  const pointsPerCluster = 20; // Points per cluster
  const noisePoints = 50; // Additional random points

  // Create clusters
  for (let i = 0; i < clusterCount; i++) {
    // Generate random cluster center near the hotspot center
    const clusterCenter = {
      longitude: parseFloat(
        (
          Math.random() * hotspotRadius * 2 +
          (hotspotCenter.longitude - hotspotRadius)
        ).toFixed(6),
      ),
      latitude: parseFloat(
        (
          Math.random() * hotspotRadius * 2 +
          (hotspotCenter.latitude - hotspotRadius)
        ).toFixed(6),
      ),
    };

    // Create points in the cluster
    for (let j = 0; j < pointsPerCluster; j++) {
      const offset = 0.0001; // Small random offset within the cluster
      const longitude = parseFloat(
        (clusterCenter.longitude + Math.random() * offset - offset / 2).toFixed(
          6,
        ),
      );
      const latitude = parseFloat(
        (clusterCenter.latitude + Math.random() * offset - offset / 2).toFixed(
          6,
        ),
      );
      const count = Math.floor(Math.random() * 50) + 50; // Higher density counts (50-100)
      points.push([longitude, latitude, count]);
    }
  }

  // Add noise points (low density, spread out)
  for (let k = 0; k < noisePoints; k++) {
    const longitude = parseFloat(
      (
        Math.random() * (hotspotRadius * 4) +
        (hotspotCenter.longitude - hotspotRadius * 2)
      ).toFixed(6),
    );
    const latitude = parseFloat(
      (
        Math.random() * (hotspotRadius * 4) +
        (hotspotCenter.latitude - hotspotRadius * 2)
      ).toFixed(6),
    );
    const count = Math.floor(Math.random() * 30) + 1; // Lower density counts (1-30)
    points.push([longitude, latitude, count]);
  }

  return points;
}
