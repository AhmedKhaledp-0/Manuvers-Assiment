# Orbital Transfer Calculator

## Course Project Information

- **Course:** Orbital Maneuvers
- **Student:** Ahmed Khaked
- **Supervisor:** DR. Mohammed Elfran
- **Institution:** [Your Institution Name]

## Project Overview

An interactive web application for calculating and visualizing orbital transfer maneuvers, including:

- Hohmann Transfers (Circular-to-Circular)
- Bi-Elliptic Transfers
- Non-Circular Hohmann Transfers
- ΔV Comparison Analysis

## Features

- Real-time calculations using standard orbital mechanics equations
- Interactive visualizations of transfer orbits
- Comprehensive step-by-step results with detailed equations
- Comparative analysis tools for different transfer methods
- Support for both circular and elliptical orbits

## Technical Implementation

- Built with React and TypeScript
- Mathematical computations using standard orbital mechanics formulas
- Visualization using SVG and animation
- Formula rendering using KaTeX
- Responsive design for all device sizes

## Mathematical Foundation

The calculator implements core orbital mechanics equations including:

- Vis-viva equation
- Angular momentum conservation
- Kepler's laws of orbital motion
- Transfer orbit calculations
- ΔV optimization

## Orbital Mechanics Fundamentals

### Key Laws and Principles

1. **Kepler's Laws**

   - First Law: Orbits are elliptical with the central body at one focus
   - Second Law: Equal areas are swept in equal times (conservation of angular momentum)
   - Third Law: The square of the orbital period is proportional to the cube of the semi-major axis

2. **Conservation Laws**
   - Conservation of Energy
   - Conservation of Angular Momentum
   - Conservation of Linear Momentum

### Basic Equations

1. **Vis-viva Equation**

   ```
   v² = μ(2/r - 1/a)
   ```

   where:

   - v = orbital velocity
   - μ = gravitational parameter
   - r = current radius
   - a = semi-major axis

2. **Orbital Period**

   ```
   T = 2π√(a³/μ)
   ```

3. **Specific Angular Momentum**
   ```
   h = r × v = √[μa(1-e²)]
   ```

### Transfer Methods Explained

1. **Hohmann Transfer (Circular-to-Circular)**

   - Minimum energy transfer between circular orbits
   - Two-impulse maneuver
   - Transfer orbit is elliptical and tangent to both initial and final orbits
   - ΔV calculation:
     ```
     ΔV₁ = √(μ/r₁)[√(2r₂/(r₁+r₂)) - 1]
     ΔV₂ = √(μ/r₂)[1 - √(2r₁/(r₁+r₂))]
     ```

2. **Non-Circular Hohmann Transfer**

   - Transfer between elliptical orbits
   - Can be initiated from either apogee or perigee
   - Uses angular momentum conservation
   - Key equations:
     ```
     h₁ = √(2μ)√(rₐrₐ'/(rₐ+rₐ'))
     h₂ = √(2μ)√(rᵦrᵦ'/(rᵦ+rᵦ'))
     ```

3. **Bi-Elliptic Transfer**
   - Three-impulse maneuver
   - More efficient than Hohmann for large radius ratios (>11.94)
   - Uses intermediate orbit to achieve better efficiency
   - Transfer time is longer than Hohmann
   - Efficiency crossover equation:
     ```
     (r₂/r₁) > 11.94
     ```

### Common Parameters

- **Orbital Elements**

  - Semi-major axis (a)
  - Eccentricity (e)
  - Inclination (i)
  - Right ascension of ascending node (Ω)
  - Argument of periapsis (ω)
  - True anomaly (ν)

- **Energy and Momentum**
  - Specific orbital energy: ε = -μ/(2a)
  - Angular momentum: h = r × v
  - Linear momentum: p = mv

### Calculation Methods

1. **Transfer Orbit Parameters**

   ```
   aₜ = (r₁ + r₂)/2
   eₜ = (r₂ - r₁)/(r₂ + r₁)
   ```

2. **Transfer Time**

   ```
   Δt = π√(aₜ³/μ)
   ```

3. **Velocity Changes**
   ```
   v₁ = √(μ/r₁)
   v₂ = √(μ/r₂)
   vₜ₁ = √[μ(2/r₁ - 1/aₜ)]
   vₜ₂ = √[μ(2/r₂ - 1/aₜ)]
   ```

## Getting Started

1. Clone the repository
2. Install dependencies:

## Mathematical Foundation

### Fundamental Laws

1. **Kepler's Laws**

   - First Law: All planets move in elliptical orbits, with the sun at one focus
   - Second Law: $\frac{dA}{dt} = \frac{h}{2} = constant$
   - Third Law: $\frac{T^2}{a^3} = \frac{4\pi^2}{GM}$

2. **Conservation Laws**
   - Energy: $E = \frac{v^2}{2} - \frac{\mu}{r} = -\frac{\mu}{2a} = constant$
   - Angular Momentum: $\vec{h} = \vec{r} \times \vec{v} = \sqrt{\mu a(1-e^2)} = constant$
   - Linear Momentum: $\vec{p} = m\vec{v}$

### Key Equations

1. **Vis-viva Equation**
   $$v^2 = \mu(\frac{2}{r} - \frac{1}{a})$$

2. **Orbital Period**
   $$T = 2\pi\sqrt{\frac{a^3}{\mu}}$$

3. **Specific Angular Momentum**
   $$h = r \times v = \sqrt{\mu a(1-e^2)}$$

### Transfer Methods

1. **Hohmann Transfer**

   - ΔV calculations:
     $$\Delta v_1 = \sqrt{\frac{\mu}{r_1}}\left[\sqrt{\frac{2r_2}{r_1+r_2}} - 1\right]$$
     $$\Delta v_2 = \sqrt{\frac{\mu}{r_2}}\left[1 - \sqrt{\frac{2r_1}{r_1+r_2}}\right]$$

2. **Non-Circular Transfer**

   - Angular momentum equations:
     $$h_1 = \sqrt{2\mu}\sqrt{\frac{r_ar_{a'}}{r_a + r_{a'}}}$$
     $$h_2 = \sqrt{2\mu}\sqrt{\frac{r_br_{b'}}{r_b + r_{b'}}}$$
     $$h_3 = \sqrt{2\mu}\sqrt{\frac{r_ar_b}{r_a + r_b}}$$

3. **Bi-Elliptic Transfer**
   - Efficiency criterion:
     $$\frac{r_2}{r_1} > 11.94$$
   - Total ΔV:
     $$\Delta v_{total} = \Delta v_1 + \Delta v_2 + \Delta v_3$$

### Orbit Parameters

1. **Orbital Elements**

   - Semi-major axis: $a = \frac{r_p + r_a}{2}$
   - Eccentricity: $e = \frac{r_a - r_p}{r_a + r_p}$
   - Specific energy: $\varepsilon = -\frac{\mu}{2a}$

2. **Transfer Parameters**

   - Transfer orbit semi-major axis: $a_t = \frac{r_1 + r_2}{2}$
   - Transfer orbit eccentricity: $e_t = \frac{|r_2 - r_1|}{r_2 + r_1}$
   - Transfer time: $t_{transfer} = \pi\sqrt{\frac{a_t^3}{\mu}}$

3. **Velocity Calculations**
   - Circular velocity: $v_c = \sqrt{\frac{\mu}{r}}$
   - Transfer velocities:
     $$v_{t1} = \sqrt{\mu(\frac{2}{r_1} - \frac{1}{a_t})}$$
     $$v_{t2} = \sqrt{\mu(\frac{2}{r_2} - \frac{1}{a_t})}$$
