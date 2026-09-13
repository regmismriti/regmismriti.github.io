import { Link } from 'react-router-dom'
import {
  FaArrowLeft,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaTag
} from 'react-icons/fa'

export default function BlogUncertainty() {
  return (
    <div className="bp">
      <nav className="bp-nav">
        <Link to="/" className="bp-back">
          <FaArrowLeft /> Back to Portfolio
        </Link>

        <span className="bp-logo">&lt;SR/&gt;</span>
      </nav>

      <article className="bp-content">
        <span className="bp-cat">Machine Learning</span>

        <h1 className="bp-title">
          Understanding Uncertainty in Classification — From Softmax to
          Evidential Deep Learning
        </h1>

        <div className="bp-meta">
          <span>
            <FaUser /> Smriti Regmi
          </span>

          <span>
            <FaCalendarAlt /> September 12, 2026
          </span>

          <span>
            <FaClock /> 18 min read
          </span>

          <span>
            <FaTag /> Uncertainty, Bayesian ML, EDL
          </span>
        </div>

        <div className="bp-body">
          <p>
            Modern classification models can achieve remarkable accuracy, but
            accuracy alone does not tell us whether a prediction should be
            trusted.
          </p>

          <p>
            Consider a medical-image classifier that predicts a disease with a
            probability of <strong>0.98</strong>. At first glance, the result
            appears highly reliable. But several important questions remain:
            Has the model seen similar examples before? Is the image noisy or
            ambiguous? Would another equally plausible model make the same
            prediction? And does 0.98 actually mean the prediction has a 98%
            chance of being correct?
          </p>

          <p>
            These questions motivate a fundamental area of machine learning:
            <strong> uncertainty quantification</strong>.
          </p>

          <div className="bp-callout">
            <strong>Key idea:</strong> A trustworthy model should not only
            answer <em>"What class do I predict?"</em> — it should also help us
            answer <em>"How much should I trust this prediction?"</em>
          </div>

          {/* ------------------------------------------------ */}
          {/* 1. SOFTMAX */}
          {/* ------------------------------------------------ */}

          <h2>1. Softmax Gives Probabilities — But Not Necessarily Uncertainty</h2>

          <p>
            A standard neural-network classifier first produces a set of raw
            scores called <strong>logits</strong>.
          </p>

          <pre>
            <code>{`z = [z₁, z₂, ..., zₖ]

Example:

z = [2.0, 1.0, 0.1]`}</code>
          </pre>

          <p>
            The softmax function converts these arbitrary real-valued scores
            into normalized probabilities:
          </p>

          <pre>
            <code>{`pₖ = exp(zₖ) / Σⱼ exp(zⱼ)`}</code>
          </pre>

          <p>For example, softmax may produce:</p>

          <pre>
            <code>{`p = [0.66, 0.24, 0.10]`}</code>
          </pre>

          <p>The predicted class is simply the class with maximum probability:</p>

          <pre>
            <code>{`ŷ = argmaxₖ pₖ`}</code>
          </pre>

          <p>
            Mathematically, the model is estimating something like:
          </p>

          <pre>
            <code>{`p(y = k | x, θ)`}</code>
          </pre>

          <p>
            Here, <strong>x</strong> is the input and <strong>θ</strong>{" "}
            represents a particular fixed set of learned model parameters.
          </p>

          <div className="bp-callout">
            <strong>Important:</strong> A softmax probability of 0.95 does not
            automatically mean that the model has a 95% probability of being
            correct.
          </div>

          {/* ------------------------------------------------ */}
          {/* 2. ENTROPY */}
          {/* ------------------------------------------------ */}

          <h2>2. Entropy — Measuring Predictive Indecision</h2>

          <p>Consider two predictions:</p>

          <pre>
            <code>{`Model A: [0.98, 0.01, 0.01]

Model B: [0.34, 0.33, 0.33]`}</code>
          </pre>

          <p>
            Model A clearly favors one class, while Model B is almost equally
            divided among all classes.
          </p>

          <p>
            A common way to quantify this uncertainty is{" "}
            <strong>predictive entropy</strong>:
          </p>

          <pre>
            <code>{`H(p) = -Σₖ pₖ log(pₖ)`}</code>
          </pre>

          <p>
            Entropy measures how spread out a probability distribution is.
          </p>

          <ul>
            <li>
              <strong>Low entropy:</strong> one class dominates the prediction
            </li>

            <li>
              <strong>High entropy:</strong> probabilities are distributed
              across several classes
            </li>
          </ul>

          <p>
            For a classification problem with <strong>K</strong> classes,
            entropy is maximized when every class receives equal probability:
          </p>

          <pre>
            <code>{`pₖ = 1 / K`}</code>
          </pre>

          <h2>The Limitation of Entropy</h2>

          <p>
            Imagine a classifier trained exclusively on images of cats and
            dogs.
          </p>

          <p>
            If we show it a blurry image that could genuinely be either a cat
            or a dog, it might produce:
          </p>

          <pre>
            <code>{`[0.50, 0.50]`}</code>
          </pre>

          <p>
            High entropy is reasonable because the observation itself is
            ambiguous.
          </p>

          <p>
            But now show the same model an image of a zebra. The classifier
            could still output:
          </p>

          <pre>
            <code>{`[0.99, 0.01]`}</code>
          </pre>

          <p>
            The entropy is extremely low even though the model has never
            learned what a zebra is.
          </p>

          <div className="bp-callout">
            <strong> Key insight:</strong> Softmax entropy tells us how
            uncertain the model's probability vector is, but it does not
            automatically tell us whether the model has enough knowledge to
            make the prediction.
          </div>

          {/* ------------------------------------------------ */}
          {/* 3. CONFIDENCE VS CALIBRATION */}
          {/* ------------------------------------------------ */}

          <h2>3. Confidence, Uncertainty, and Calibration Are Different</h2>

          <p>
            These three concepts are frequently used interchangeably, but they
            describe different properties.
          </p>

          <ul>
            <li>
              <strong>Confidence</strong> — the probability reported by the
              model
            </li>

            <li>
              <strong>Uncertainty</strong> — how unsure we should be about the
              prediction
            </li>

            <li>
              <strong>Calibration</strong> — whether reported probabilities
              correspond to empirical correctness
            </li>
          </ul>

          <p>
            Suppose a classifier makes 100 predictions and assigns
            approximately 80% confidence to each of them.
          </p>

          <p>
            If roughly 80 predictions are actually correct, the model is well
            calibrated.
          </p>

          <p>If only 50 are correct, the model is overconfident.</p>

          <pre>
            <code>{`P(Y = Ŷ | confidence = 0.8) ≈ 0.8`}</code>
          </pre>

          <p>
            A model can therefore have excellent classification accuracy while
            still producing poorly calibrated probabilities.
          </p>

          {/* ------------------------------------------------ */}
          {/* 4. ALEATORIC / EPISTEMIC */}
          {/* ------------------------------------------------ */}

          <h2>4. Two Fundamental Sources of Uncertainty</h2>

          <p>
            One of the most useful distinctions in uncertainty-aware machine
            learning is between <strong>aleatoric</strong> and{" "}
            <strong>epistemic</strong> uncertainty.
          </p>

          <h2>Aleatoric Uncertainty — Ambiguity in the Data</h2>

          <p>
            Aleatoric uncertainty comes from the observation itself.
          </p>

          <p>
            Imagine a severely blurred image that genuinely contains
            insufficient information to determine the correct class. Even a
            theoretically perfect model may remain uncertain.
          </p>

          <p>Examples include:</p>

          <ul>
            <li>sensor noise</li>
            <li>motion blur</li>
            <li>missing information</li>
            <li>overlapping class definitions</li>
            <li>intrinsically ambiguous observations</li>
          </ul>

          <pre>
            <code>{`Aleatoric uncertainty
≈ ambiguity or noise inherent in x`}</code>
          </pre>

          <p>
            This uncertainty cannot always be eliminated simply by collecting
            more training data because the ambiguity exists in the observation
            itself.
          </p>

          <h2>Epistemic Uncertainty — Uncertainty About the Model</h2>

          <p>
            Epistemic uncertainty comes from insufficient knowledge.
          </p>

          <p>
            Imagine three plausible models trained on the same dataset:
          </p>

          <pre>
            <code>{`Model θ₁ → [0.9, 0.1]

Model θ₂ → [0.2, 0.8]

Model θ₃ → [0.7, 0.3]`}</code>
          </pre>

          <p>
            The models disagree substantially. This disagreement indicates that
            the available training data may not contain enough information to
            determine what the model should believe.
          </p>

          <pre>
            <code>{`p(θ | D)`}</code>
          </pre>

          <p>
            represents uncertainty over model parameters given training data{" "}
            <strong>D</strong>.
          </p>

          <p>
            Unlike aleatoric uncertainty, epistemic uncertainty can often be
            reduced by collecting more relevant training data.
          </p>

          {/* ------------------------------------------------ */}
          {/* 5. BAYESIAN */}
          {/* ------------------------------------------------ */}

          <h2>5. Bayesian Thinking — There May Be More Than One Plausible Model</h2>

          <p>
            Conventional neural-network training typically leaves us with a
            single learned parameter configuration:
          </p>

          <pre>
            <code>{`θ*`}</code>
          </pre>

          <p>Prediction then becomes:</p>

          <pre>
            <code>{`p(y | x, θ*)`}</code>
          </pre>

          <p>
            Bayesian thinking instead represents a distribution over plausible
            parameter values:
          </p>

          <pre>
            <code>{`p(θ | D)`}</code>
          </pre>

          <p>The predictive distribution becomes:</p>

          <pre>
            <code>{`p(y | x, D)
= ∫ p(y | x, θ) p(θ | D) dθ`}</code>
          </pre>

          <p>
            The equation may look complicated, but the intuition is simple:
          </p>

          <div className="bp-callout">
            <strong>Bayesian intuition:</strong> Consider all plausible models,
            obtain a prediction from each model, and combine those predictions
            according to how plausible each model is.
          </div>

          <pre>
            <code>{`D
↓
p(θ | D)
↓
p(y | x, θ)
↓
p(y | x, D)`}</code>
          </pre>

          {/* ------------------------------------------------ */}
          {/* 6. MONTE CARLO */}
          {/* ------------------------------------------------ */}

          <h2>6. Monte Carlo Approximation</h2>

          <p>
            For modern neural networks, computing the Bayesian predictive
            integral exactly is usually impractical.
          </p>

          <p>
            Instead, we can sample several plausible parameter configurations:
          </p>

          <pre>
            <code>{`θ⁽¹⁾, θ⁽²⁾, ..., θ⁽ᴹ⁾ ~ p(θ | D)`}</code>
          </pre>

          <p>
            The predictive distribution is then approximated using an average:
          </p>

          <pre>
            <code>{`p(y | x, D)
≈ (1 / M) Σₘ p(y | x, θ⁽ᵐ⁾)`}</code>
          </pre>

          <p>
            The difficult integral has now been replaced by a simple average.
          </p>

          <p>For example:</p>

          <pre>
            <code>{`Model 1 → [0.9, 0.1]
Model 2 → [0.8, 0.2]
Model 3 → [0.7, 0.3]

Average → [0.8, 0.2]`}</code>
          </pre>

          <p>
            Equally important is how strongly the predictions disagree. Large
            disagreement suggests higher epistemic uncertainty.
          </p>

          {/* ------------------------------------------------ */}
          {/* 7. ENSEMBLES */}
          {/* ------------------------------------------------ */}

          <h2>7. Deep Ensembles</h2>

          <p>
            One of the most practical methods for estimating model uncertainty
            is the <strong>deep ensemble</strong>.
          </p>

          <p>
            Train the same neural-network architecture multiple times using
            different random initializations, data orders, or stochastic
            training conditions:
          </p>

          <pre>
            <code>{`θ₁, θ₂, ..., θₘ`}</code>
          </pre>

          <p>The final prediction is obtained by averaging:</p>

          <pre>
            <code>{`p(y | x, D)
≈ (1 / M) Σₘ p(y | x, θₘ)`}</code>
          </pre>

          <p>Suppose five models predict:</p>

          <pre>
            <code>{`0.91, 0.89, 0.93, 0.88, 0.90`}</code>
          </pre>

          <p>
            They strongly agree, suggesting relatively low epistemic
            uncertainty.
          </p>

          <p>Now suppose they predict:</p>

          <pre>
            <code>{`0.95, 0.15, 0.82, 0.30, 0.70`}</code>
          </pre>

          <p>
            The disagreement is much larger, indicating substantial model
            uncertainty.
          </p>

          <div className="bp-callout">
            <strong>Useful intuition:</strong> Uncertainty within one model can
            reflect ambiguity in the data, while disagreement among plausible
            models can reveal uncertainty about the model itself.
          </div>

          {/* ------------------------------------------------ */}
          {/* 8. EDL */}
          {/* ------------------------------------------------ */}

          <h2>8. Evidential Deep Learning — Predict Evidence Instead of Only Probabilities</h2>

          <p>
            Deep ensembles provide useful uncertainty estimates, but they
            require multiple models or multiple inference passes.
          </p>

          <p>
            <strong>Evidential Deep Learning (EDL)</strong> takes a different
            approach.
          </p>

          <p>
            Instead of directly predicting one categorical probability vector,
            a single neural network predicts non-negative{" "}
            <strong>evidence</strong> for each class:
          </p>

          <pre>
            <code>{`eₖ ≥ 0`}</code>
          </pre>

          <p>The evidence is converted into Dirichlet parameters:</p>

          <pre>
            <code>{`αₖ = eₖ + 1`}</code>
          </pre>

          <p>The resulting vector:</p>

          <pre>
            <code>{`α = [α₁, α₂, ..., αₖ]`}</code>
          </pre>

          <p>
            parameterizes a <strong>Dirichlet distribution</strong> over
            possible categorical probability vectors.
          </p>

          <pre>
            <code>{`p ~ Dirichlet(α)

y ~ Categorical(p)`}</code>
          </pre>

          <p>The hierarchy becomes:</p>

          <pre>
            <code>{`x → α → p → y`}</code>
          </pre>

          <div className="bp-callout">
            <strong>📌 Core difference:</strong> A standard softmax classifier
            predicts one probability vector. EDL predicts a{" "}
            <strong>distribution over possible probability vectors</strong>.
          </div>

          {/* ------------------------------------------------ */}
          {/* 9. DIRICHLET */}
          {/* ------------------------------------------------ */}

          <h2>9. Understanding the Dirichlet Distribution</h2>

          <p>
            Dirichlet parameters can loosely be interpreted as{" "}
            <strong>pseudo-counts</strong> or accumulated evidence.
          </p>

          <p>Consider:</p>

          <pre>
            <code>{`α = [8, 1, 1]

Mean probability:

[8, 1, 1] / 10
= [0.8, 0.1, 0.1]`}</code>
          </pre>

          <p>Now compare it with:</p>

          <pre>
            <code>{`α = [800, 100, 100]

Mean probability:

[0.8, 0.1, 0.1]`}</code>
          </pre>

          <p>
            Both produce exactly the same mean probability vector, but they
            represent dramatically different amounts of evidence.
          </p>

          <p>Define total Dirichlet strength:</p>

          <pre>
            <code>{`S = Σₖ αₖ`}</code>
          </pre>

          <p>The expected probability of class k is:</p>

          <pre>
            <code>{`E[pₖ] = αₖ / S`}</code>
          </pre>

          <p>The variance is:</p>

          <pre>
            <code>{`Var(pₖ)
= αₖ(S - αₖ) / [S²(S + 1)]`}</code>
          </pre>

          <p>As total evidence increases:</p>

          <pre>
            <code>{`S ↑  ⇒  Var(pₖ) ↓`}</code>
          </pre>

          <p>
            A large concentration means possible probability vectors are
            tightly grouped around the mean. A small concentration means there
            is considerably more uncertainty about the underlying probability
            vector.
          </p>

          <p>If the model produces no evidence:</p>

          <pre>
            <code>{`e = [0, 0, 0]

α = [1, 1, 1]`}</code>
          </pre>

          <p>
            The resulting symmetric Dirichlet represents a state of minimal
            evidence about which class should be preferred.
          </p>

          {/* ------------------------------------------------ */}
          {/* 10. UNCERTAINTY DECOMPOSITION */}
          {/* ------------------------------------------------ */}

          <h2>10. Separating Total, Aleatoric, and Epistemic Uncertainty</h2>

          <p>
            EDL introduces two different sources of randomness:
          </p>

          <pre>
            <code>{`α → p → y`}</code>
          </pre>

          <p>
            There is uncertainty about which probability vector{" "}
            <strong>p</strong> is correct, and there may still be uncertainty
            about the label <strong>y</strong> even if p were known exactly.
          </p>

          <h2>Total Predictive Uncertainty</h2>

          <p>First compute the mean probability:</p>

          <pre>
            <code>{`p̄ₖ = E[pₖ] = αₖ / S`}</code>
          </pre>

          <p>Then calculate predictive entropy:</p>

          <pre>
            <code>{`U_total
= H(p̄)
= -Σₖ p̄ₖ log(p̄ₖ)`}</code>
          </pre>

          <h2>Aleatoric Uncertainty in EDL</h2>

          <p>
            For a particular probability vector <strong>p</strong>, class
            uncertainty is:
          </p>

          <pre>
            <code>{`H(y | p)
= -Σₖ pₖ log(pₖ)`}</code>
          </pre>

          <p>
            Since EDL represents many possible probability vectors, we average
            that entropy over the Dirichlet:
          </p>

          <pre>
            <code>{`U_alea
= Eₚ~Dir(α)[H(y | p)]`}</code>
          </pre>

          <h2>Epistemic Uncertainty in EDL</h2>

          <p>
            Epistemic uncertainty can be expressed as the difference between
            predictive entropy and expected conditional entropy:
          </p>

          <pre>
            <code>{`U_epis
= H(E[p]) - E[H(p)]`}</code>
          </pre>

          <p>Conceptually:</p>

          <pre>
            <code>{`U_total
= U_alea + U_epis`}</code>
          </pre>

          <p>or:</p>

          <pre>
            <code>{`Predictive uncertainty
=
Data ambiguity
+
Model uncertainty`}</code>
          </pre>

          <p>Consider:</p>

          <pre>
            <code>{`α = [2, 2]

and

α = [200, 200]`}</code>
          </pre>

          <p>Both have the same expected probability:</p>

          <pre>
            <code>{`[0.5, 0.5]`}</code>
          </pre>

          <p>
            But the first Dirichlet is much broader. The second strongly
            concentrates around a genuine 50/50 probability.
          </p>

          <p>
            This is information that cannot be recovered by looking only at the
            mean softmax-style probability vector.
          </p>

          {/* ------------------------------------------------ */}
          {/* 11. EVIDENTIAL UNCERTAINTY */}
          {/* ------------------------------------------------ */}

          <h2>11. A Simple Evidential Uncertainty Score</h2>

          <p>
            Another commonly used EDL quantity is based on total evidence:
          </p>

          <pre>
            <code>{`S = Σₖ αₖ`}</code>
          </pre>

          <p>A simple evidential uncertainty measure is:</p>

          <pre>
            <code>{`u = K / S`}</code>
          </pre>

          <p>
            For three classes with effectively no evidence:
          </p>

          <pre>
            <code>{`α = [1, 1, 1]

S = 3

u = 3 / 3 = 1`}</code>
          </pre>

          <p>This corresponds to high evidential uncertainty.</p>

          <p>Now consider:</p>

          <pre>
            <code>{`α = [100, 2, 1]

S = 103

u = 3 / 103 ≈ 0.029`}</code>
          </pre>

          <p>
            The much larger amount of evidence corresponds to much lower
            evidential uncertainty.
          </p>

          {/* ------------------------------------------------ */}
          {/* 12. TRAINING */}
          {/* ------------------------------------------------ */}

          <h2>12. How Evidential Deep Learning Is Trained</h2>

          <p>
            Representing evidence is useful only if the neural network learns
            to produce evidence responsibly.
          </p>

          <p>The training objective should encourage two things:</p>

          <ul>
            <li>predict the correct class</li>
            <li>avoid producing unjustified evidence</li>
          </ul>

          <p>
            One classical EDL classification objective uses expected
            squared-error risk:
          </p>

          <pre>
            <code>{`L_data =
Σₖ [
  (yₖ - αₖ / S)²
  +
  αₖ(S - αₖ) / (S²(S + 1))
]`}</code>
          </pre>

          <p>The first part:</p>

          <pre>
            <code>{`(yₖ - αₖ / S)²`}</code>
          </pre>

          <p>penalizes incorrect mean class predictions.</p>

          <p>The second part:</p>

          <pre>
            <code>{`αₖ(S - αₖ) / [S²(S + 1)]`}</code>
          </pre>

          <p>
            corresponds to the Dirichlet variance. The training objective is
            therefore influenced by both prediction quality and uncertainty.
          </p>

          {/* ------------------------------------------------ */}
          {/* 13. KL */}
          {/* ------------------------------------------------ */}

          <h2>13. Why KL Regularization Is Needed</h2>

          <p>
            Suppose class 1 is correct, but the network outputs:
          </p>

          <pre>
            <code>{`α = [10, 50, 30]`}</code>
          </pre>

          <p>
            The model has accumulated significant evidence for classes that are
            incorrect.
          </p>

          <p>
            EDL can penalize unsupported evidence by comparing the model's
            distribution with a state representing minimal evidence:
          </p>

          <pre>
            <code>{`Dirichlet(1, 1, ..., 1)`}</code>
          </pre>

          <p>A KL-divergence regularization term can be added:</p>

          <pre>
            <code>{`L_KL =
KL[
  Dir(α̃)
  ||
  Dir(1)
]`}</code>
          </pre>

          <p>The complete objective becomes:</p>

          <pre>
            <code>{`L = L_data + λL_KL`}</code>
          </pre>

          <div className="bp-callout">
            <strong>Cross-entropy asks:</strong> Did you assign high probability
            to the correct class?
            <br />
            <br />
            <strong>EDL asks:</strong> Did you predict correctly, and is the
            amount of evidence supporting that prediction justified?
          </div>

          {/* ------------------------------------------------ */}
          {/* 14. LIMITATION */}
          {/* ------------------------------------------------ */}

          <h2>14. EDL Is Not Automatically Trustworthy</h2>

          <p>
            An important caveat is that simply training a network using an
            evidential objective does not guarantee that unfamiliar inputs will
            receive low evidence.
          </p>

          <p>Ideally:</p>

          <pre>
            <code>{`OOD input
→
α ≈ [1, 1, ..., 1]`}</code>
          </pre>

          <p>
            But neural networks can extrapolate unpredictably and may still
            produce strong evidence for observations far outside their training
            distribution.
          </p>

          <div className="bp-callout">
            <strong> Research principle:</strong> An uncertainty method should
            not be considered reliable simply because its mathematics contains
            an uncertainty variable. Its behavior must be tested empirically.
          </div>

          {/* ------------------------------------------------ */}
          {/* 15. EVALUATION */}
          {/* ------------------------------------------------ */}

          <h2>15. Evaluating an Uncertainty-Aware Classifier</h2>

          <p>
            A rigorous uncertainty experiment must evaluate substantially more
            than classification accuracy.
          </p>

          <h2>Calibration</h2>

          <p>Useful calibration metrics include:</p>

          <ul>
            <li>
              <strong>Expected Calibration Error (ECE)</strong>
            </li>

            <li>
              <strong>Negative Log-Likelihood (NLL)</strong>
            </li>

            <li>
              <strong>Brier Score</strong>
            </li>
          </ul>

          <p>
            Accuracy measures whether the predicted class is correct. NLL and
            Brier score evaluate the quality of the full probability
            distribution, while ECE measures agreement between confidence and
            observed accuracy.
          </p>

          <h2>Distribution Shift and Corrupted Inputs</h2>

          <p>
            A useful uncertainty estimator should also respond appropriately as
            input quality deteriorates.
          </p>

          <p>Examples of corruption include:</p>

          <ul>
            <li>Gaussian or sensor noise</li>
            <li>blur</li>
            <li>compression artifacts</li>
            <li>brightness changes</li>
            <li>contrast changes</li>
            <li>other realistic perturbations</li>
          </ul>

          <p>
            As the input becomes less reliable, a well-behaved system should
            generally become more uncertain.
          </p>

          <h2>Out-of-Distribution Detection</h2>

          <p>
            Different uncertainty scores can be used to detect unfamiliar
            examples, including:
          </p>

          <pre>
            <code>{`Predictive entropy:
H(p̄)

Evidential uncertainty:
K / S

Epistemic mutual information:
I(y ; p | x)

Ensemble disagreement`}</code>
          </pre>

          <p>
            Common evaluation metrics for OOD detection include:
          </p>

          <ul>
            <li>
              <strong>AUROC</strong>
            </li>

            <li>
              <strong>AUPR</strong>
            </li>

            <li>
              <strong>FPR@95TPR</strong>
            </li>
          </ul>

          <p>
            AUROC measures whether the uncertainty score tends to rank OOD
            examples above in-distribution examples.
          </p>

          <p>
            AUPR can be especially useful when the two populations are
            imbalanced.
          </p>

          <p>
            FPR@95TPR measures how many normal examples are incorrectly
            rejected when the system detects 95% of the OOD examples.
          </p>

          <div className="bp-callout">
            <strong>Important:</strong> Good OOD detection does not
            automatically imply good calibration. These metrics evaluate
            different properties.
          </div>

          {/* ------------------------------------------------ */}
          {/* 16. SELECTIVE PREDICTION */}
          {/* ------------------------------------------------ */}

          <h2>16. Selective Prediction — Let the Model Admit When It Is Unsure</h2>

          <p>
            In many real-world systems, the model does not need to make a
            prediction for every example.
          </p>

          <p>
            Highly uncertain cases can instead be referred to a human expert or
            another decision-making process.
          </p>

          <p>Define coverage as:</p>

          <pre>
            <code>{`coverage =
accepted examples / total examples`}</code>
          </pre>

          <p>Define risk as:</p>

          <pre>
            <code>{`risk =
errors among accepted examples
/
accepted examples`}</code>
          </pre>

          <p>
            A good uncertainty estimator should allow us to reject the most
            uncertain observations so that the predictions we keep have lower
            error.
          </p>

          <p>
            This trade-off can be summarized using the{" "}
            <strong>Area Under the Risk-Coverage Curve</strong>:
          </p>

          <pre>
            <code>{`AURC = ∫₀¹ risk(c) dc`}</code>
          </pre>

          <p>
            <strong>Lower AURC is better.</strong>
          </p>

          {/* ------------------------------------------------ */}
          {/* RECOMMENDED EVALUATION */}
          {/* ------------------------------------------------ */}

          <h2>Recommended Evaluation Set for an EDL Experiment</h2>

          <p>
            A strong evidential-classification study should evaluate several
            different dimensions of model behavior.
          </p>

          <ul>
            <li>
              <strong>Clean in-distribution data</strong> — report accuracy,
              NLL, Brier score, and ECE.
            </li>

            <li>
              <strong>Corrupted in-distribution data</strong> — measure
              classification performance and uncertainty as corruption severity
              increases.
            </li>

            <li>
              <strong>Near-OOD and far-OOD data</strong> — evaluate AUROC,
              AUPR, and FPR@95TPR.
            </li>

            <li>
              <strong>Error detection</strong> — determine whether uncertainty
              is higher for incorrect predictions.
            </li>

            <li>
              <strong>Selective prediction</strong> — evaluate risk-coverage
              curves and AURC.
            </li>

            <li>
              <strong>Multiple random seeds</strong> — report averages and
              variation instead of relying on a single training run.
            </li>

            <li>
              <strong>Strong baselines</strong> — compare EDL with softmax
              entropy, temperature scaling, MC dropout, and deep ensembles.
            </li>
          </ul>

          <div className="bp-callout">
            <strong> Evaluation principle:</strong> Every uncertainty claim
            should be matched with a metric that actually tests that claim.
          </div>

          {/* ------------------------------------------------ */}
          {/* CONCLUSION */}
          {/* ------------------------------------------------ */}

          <h2>Final Perspective</h2>

          <p>
            The progression from ordinary classification to uncertainty-aware
            classification begins with:
          </p>

          <pre>
            <code>{`x
→ logits
→ softmax
→ p(y | x, θ)`}</code>
          </pre>

          <p>
            Softmax gives us a class distribution, while entropy tells us how
            concentrated that distribution is.
          </p>

          <p>
            Bayesian thinking then reminds us that the model parameters
            themselves may be uncertain:
          </p>

          <pre>
            <code>{`D → p(θ | D)`}</code>
          </pre>

          <p>
            This leads to the Bayesian posterior predictive distribution:
          </p>

          <pre>
            <code>{`p(y | x, D)
=
∫ p(y | x, θ)
  p(θ | D)
  dθ`}</code>
          </pre>

          <p>
            Monte Carlo techniques and deep ensembles approximate this
            principle by combining predictions from multiple plausible models.
          </p>

          <p>
            Evidential Deep Learning follows a different approach:
          </p>

          <pre>
            <code>{`x
→ evidence e
→ α = e + 1
→ Dirichlet(α)
→ probability p
→ class y`}</code>
          </pre>

          <p>
            Instead of generating only one class-probability vector, EDL
            represents a distribution over possible class-probability vectors.
            This gives us a framework for reasoning about both ambiguity in the
            observation and uncertainty in the model's knowledge.
          </p>

          <p>
            But the most important lesson is that no uncertainty method is
            automatically trustworthy simply because it produces an uncertainty
            score.
          </p>

          <blockquote>
            A trustworthy machine-learning system should not only know how to
            make a prediction. It should also know when its evidence is weak,
            when the input is unfamiliar, and when the safest decision is to
            admit uncertainty.
          </blockquote>

          <p>
            In reliable machine learning, knowing{" "}
            <strong>when not to trust a prediction</strong> can be just as
            important as producing the prediction itself.
          </p>
        </div>

        <div className="bp-author">
          <div className="bp-avatar">SR</div>

          <div>
            <p className="bp-author-name">Smriti Regmi</p>

            <p className="bp-author-bio">
              AI Researcher & ML Engineer exploring uncertainty-aware machine
              learning, agentic systems, and large language models. Passionate
              about making complex AI research accessible through intuitive
              explanations and practical experimentation.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
