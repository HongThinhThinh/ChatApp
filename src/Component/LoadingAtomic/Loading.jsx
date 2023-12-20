import React from "react";
import AtomicSpinner from "atomic-spinner";
function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <AtomicSpinner
          nucleusParticleSize="0.7"
          nucleusParticleBorderWidth="0.1"
          nucleusSpeed="3"
          nucleusParticlesPerLayer="2"
          nucleusDistanceFromCenter="1.3"
          electronSpeed="1"
          electronsPerPath="2"
          electronPathWidth="0"
          atomSize="485"
          electronPathCount="13"
        />
        Please wait a minute ...
      </div>
    </div>
  );
}

export default Loading;
