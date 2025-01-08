interface HohmannResult {
  // Basic parameters
  v1: number;                // Initial orbit velocity
  v2: number;               // Final orbit velocity
  sma: number;             // Semi-major axis of transfer orbit
  ecc: number;             // Eccentricity of transfer orbit
  
  // Velocities
  v_transfer_p: number;    // Transfer orbit velocity at periapsis
  v_transfer_a: number;    // Transfer orbit velocity at apoapsis
  delta_v1: number;        // First burn magnitude
  delta_v2: number;        // Second burn magnitude
  total_delta_v: number;   // Total delta-v required
  
  // Time parameters
  transfer_time: number;   // Transfer time
  initial_period: number;  // Initial orbit period
  final_period: number;    // Final orbit period
  
  // Energy and momentum
  initial_energy: number;  // Specific orbital energy of initial orbit
  final_energy: number;    // Specific orbital energy of final orbit
  transfer_energy: number; // Specific orbital energy of transfer orbit
  angular_momentum: number;// Angular momentum of transfer orbit
}

interface BiEllipticResult {
  // Basic parameters
  v1: number;                // Initial orbit velocity
  v2: number;                // Final orbit velocity
  v_intermediate: number;    // Velocity at intermediate orbit
  
  // Transfer orbit parameters
  sma1: number;             // Semi-major axis of first transfer
  sma2: number;             // Semi-major axis of second transfer
  ecc1: number;             // Eccentricity of first transfer
  ecc2: number;             // Eccentricity of second transfer
  
  // Velocities
  v_t1: number;             // First transfer orbit velocity at periapsis
  v_t2: number;             // First transfer orbit velocity at apoapsis
  v_t3: number;             // Second transfer orbit velocity at periapsis
  v_t4: number;             // Second transfer orbit velocity at apoapsis
  
  // Delta-v components
  delta_v1: number;         // First burn magnitude
  delta_v2: number;         // Second burn magnitude
  delta_v3: number;         // Third burn magnitude
  total_delta_v: number;    // Total delta-v required
  
  // Time parameters
  transfer_time1: number;   // First transfer time
  transfer_time2: number;   // Second transfer time
  total_time: number;       // Total transfer time
  
  // Energy parameters
  e1: number;               // Initial orbit energy
  e2: number;               // Final orbit energy
  e_t1: number;            // First transfer orbit energy
  e_t2: number;            // Second transfer orbit energy

  // Angular momentum parameters
  h1: number;              // Angular momentum of first transfer orbit
  h2: number;              // Angular momentum of second transfer orbit
  h_initial: number;       // Initial orbit angular momentum
  h_final: number;         // Final orbit angular momentum
  h_intermediate: number;  // Intermediate orbit angular momentum
}

export function calculateHohmannTransfer(r1: number, r2: number, mu: number): HohmannResult {
  if (r1 <= 0 || r2 <= 0) {
    throw new Error("Orbit radii must be positive");
  }

  // Calculate angular momentum for transfer orbit
  const h = Math.sqrt(2 * mu) * Math.sqrt((r1 * r2) / (r1 + r2));
  
  // Calculate velocities using angular momentum
  const v1_circular = Math.sqrt(mu / r1);
  const v2_circular = Math.sqrt(mu / r2);
  
  // Transfer orbit velocities from angular momentum
  const v_transfer_p = h / r1;  // Periapsis velocity
  const v_transfer_a = h / r2;  // Apoapsis velocity

  // Semi-major axis and eccentricity
  const a_t = (r1 + r2) / 2;
  const ecc = Math.abs(r2 - r1) / (r2 + r1);

  // Energy calculations
  const e1 = -mu / (2 * r1);
  const e2 = -mu / (2 * r2);
  const e_t = -mu / (2 * a_t);

  // Time calculations
  const transfer_time = Math.PI * Math.sqrt(Math.pow(a_t, 3) / mu);
  const initial_period = 2 * Math.PI * Math.sqrt(Math.pow(r1, 3) / mu);
  const final_period = 2 * Math.PI * Math.sqrt(Math.pow(r2, 3) / mu);

  // Delta-v calculations using angular momentum-derived velocities
  const delta_v1 = Math.abs(v_transfer_p - v1_circular);
  const delta_v2 = Math.abs(v2_circular - v_transfer_a);

  return {
    v1: v1_circular,
    v2: v2_circular,
    sma: a_t,
    ecc,
    v_transfer_p,
    v_transfer_a,
    delta_v1,
    delta_v2,
    total_delta_v: delta_v1 + delta_v2,
    transfer_time,
    initial_period,
    final_period,
    initial_energy: e1,
    final_energy: e2,
    transfer_energy: e_t,
    angular_momentum: h
  };
}

export function calculateBiellipticTransfer(r1: number, r2: number, r_intermediate: number, mu: number): BiEllipticResult {
  if (r1 <= 0 || r2 <= 0 || r_intermediate <= Math.max(r1, r2)) {
    throw new Error("Invalid orbit radii");
  }

  // Calculate angular momentums for both transfer orbits
  const h1 = Math.sqrt(2 * mu) * Math.sqrt((r1 * r_intermediate) / (r1 + r_intermediate));
  const h2 = Math.sqrt(2 * mu) * Math.sqrt((r_intermediate * r2) / (r_intermediate + r2));

  // Circular orbit velocities
  const v1 = Math.sqrt(mu / r1);
  const v2 = Math.sqrt(mu / r2);
  const v_intermediate = Math.sqrt(mu / r_intermediate);

  // First transfer ellipse velocities from angular momentum
  const v_t1 = h1 / r1;  // At initial orbit
  const v_t2 = h1 / r_intermediate;  // At intermediate orbit

  // Second transfer ellipse velocities from angular momentum
  const v_t3 = h2 / r_intermediate;  // At intermediate orbit
  const v_t4 = h2 / r2;  // At final orbit

  // Calculate transfer orbit parameters
  const a1 = (r1 + r_intermediate) / 2;
  const a2 = (r_intermediate + r2) / 2;
  const ecc1 = Math.abs(r_intermediate - r1) / (r_intermediate + r1);
  const ecc2 = Math.abs(r2 - r_intermediate) / (r2 + r_intermediate);

  // Energy calculations
  const e1 = -mu / (2 * r1);
  const e2 = -mu / (2 * r2);
  const e_t1 = -mu / (2 * a1);
  const e_t2 = -mu / (2 * a2);

  // Time calculations
  const transfer_time1 = Math.PI * Math.sqrt(Math.pow(a1, 3) / mu);
  const transfer_time2 = Math.PI * Math.sqrt(Math.pow(a2, 3) / mu);

  // Delta-v calculations
  const delta_v1 = Math.abs(v_t1 - v1);
  const delta_v2 = Math.abs(v_t3 - v_t2);
  const delta_v3 = Math.abs(v2 - v_t4);

  return {
    v1,
    v2,
    v_intermediate,
    sma1: a1,
    sma2: a2,
    ecc1,
    ecc2,
    v_t1,
    v_t2,
    v_t3,
    v_t4,
    delta_v1,
    delta_v2,
    delta_v3,
    total_delta_v: delta_v1 + delta_v2 + delta_v3,
    transfer_time1,
    transfer_time2,
    total_time: transfer_time1 + transfer_time2,
    e1,
    e2,
    e_t1,
    e_t2,
    h1,
    h2,
    h_initial: r1 * v1,
    h_final: r2 * v2,
    h_intermediate: r_intermediate * v_intermediate
  };
}

export function calculateHohmannFromPoint(
  rp1: number,  // Initial orbit perigee
  ra1: number,  // Initial orbit apogee
  rp2: number,  // Final orbit perigee
  ra2: number,  // Final orbit apogee
  fromApogee: boolean, // Whether starting from apogee
  mu: number = 398600.4418
) {
  const a1 = (rp1 + ra1) / 2; // Initial orbit semi-major axis
  const a2 = (rp2 + ra2) / 2; // Final orbit semi-major axis

  
  const startR = fromApogee ? ra1 : rp1;
  const endR = fromApogee ? ra2 : rp2;
  
  // Calculate velocities at departure point
  const v1 = Math.sqrt(mu * (2/startR - 1/a1));
  const v2 = Math.sqrt(mu * (2/endR - 1/a2));
  
  // Calculate transfer orbit parameters
  const at = (startR + endR) / 2;
  const et = (endR - startR) / (endR + startR);
  
  // Calculate transfer velocities
  const vt1 = Math.sqrt(mu * (2/startR - 1/at));
  const vt2 = Math.sqrt(mu * (2/endR - 1/at));
  
  // Calculate ΔVs
  const dv1 = Math.abs(vt1 - v1);
  const dv2 = Math.abs(v2 - vt2);
  const totalDv = dv1 + dv2;
  
  // Calculate transfer time
  const transferTime = Math.PI * Math.sqrt(Math.pow(at, 3) / mu);
  
  return {
    dv1,
    dv2,
    totalDv,
    transferTime,
    v1,
    v2,
    vt1,
    vt2,
    at,
    et,
    startR,
    endR
  };
}

export function calculateHohmannFromPointWithH(
  A: number,   // Initial orbit perigee
  Ap: number,  // Initial orbit apogee (A')
  B: number,   // Final orbit perigee
  Bp: number,  // Final orbit apogee (B')
  fromApogee: boolean,
  mu: number = 398600.4418
) {
  // Calculate h-values using the provided equations
  const h1 = Math.sqrt(2 * mu) * Math.sqrt((A * Ap) / (A + Ap));   // h₁ between apogees
  const h2 = Math.sqrt(2 * mu) * Math.sqrt((B * Bp) / (B + Bp));       // h₂ between perigees
  const h3 = Math.sqrt(2 * mu) * Math.sqrt((A * B) / (A + B));     // h₃ initial orbit
  const h3p = Math.sqrt(2 * mu) * Math.sqrt((Ap * Bp) / (Ap + Bp)); // h₃' final orbit

  // Calculate velocities using h-values
  const vA1 = h1 / A;      // vₐ)₁ velocity at A'
  const vA3 = h3 / A;      // vₐ)₃ velocity at A'
  const vB2 = h2 / B;        // vᵦ)₂ velocity at A
  const vB3 = h3 / B;        // vᵦ)₃ velocity at A
  const vAp1 = h1 / Ap; // vₐ')₁ velocity at B'
  const vAp3p = h3p / Ap; // vₐ')₃' velocity at B'
  const vBp2 = h2 / Bp;   // vᵦ')₂ velocity at B
  const vBp3p = h3p / Bp;   // vᵦ')₃' velocity at B

  // Calculate transfer orbit parameters
  const at = fromApogee ? (Ap + Bp) / 2 : (A + B) / 2;
  const et = fromApogee ? Math.abs(Bp - Ap) / (Bp + Ap) : Math.abs(B - A) / (B + A);

  // Calculate ΔV based on starting point
  let dv1, dv2;
  if (fromApogee) {
    dv1 = Math.abs(vA3 - vA1);  // ΔV at apogee departure
    dv2 = Math.abs(vB2 - vB3); // ΔV at apogee arrival
  } else {
    dv1 = Math.abs(vAp3p - vAp1);  // ΔV at perigee departure
    dv2 = Math.abs(vBp2 - vBp3p); // ΔV at perigee arrival
  }

  const totalDv = dv1 + dv2;
  const transferTime = Math.PI * Math.sqrt(Math.pow(at, 3) / mu);

  return {
    dv1,
    dv2,
    totalDv,
    transferTime,
    at,
    et,
    // Additional parameters for verification
    h1, h2, h3, h3p,
    vA1,vA3,vB2,vB3,vAp1,vAp3p,vBp2,vBp3p,
  };
}