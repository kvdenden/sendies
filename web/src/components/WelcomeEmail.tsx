interface WelcomeEmailProps {
  referrer?: string;
}

export default function WelcomeEmail({ referrer }: WelcomeEmailProps) {
  return (
    <div className="mx-auto p-4 md:p-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to Sendies!</h1>
      <p className="text-gray-700 mb-4">Hey there,</p>
      <p className="text-gray-700 mb-4">
        Welcome to the Sendies family! 🎉 We&apos;re absolutely thrilled to have you on board.
      </p>
      <p className="text-gray-700 mb-4">
        {referrer ? (
          <>
            Guess what? <span className="font-semibold">{referrer}</span> thinks you&apos;re going to love Sendies, and
            we couldn&apos;t agree more!
          </>
        ) : (
          ""
        )}{" "}
        With Sendies, sending money to anyone, anywhere in the world, is a breeze. Whether you&apos;re splitting a pizza
        with friends, paying your share of the rent, or sending a little surprise to a loved one, Sendies makes it
        quick, secure, and super fun.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Ready to dive in?</h2>

      <p className="text-gray-700 font-bold mb-6">
        Visit{" "}
        <a href="https://sendies.app" className="text-blue-500 hover:underline">
          www.sendies.app
        </a>{" "}
        and log in with your email
      </p>

      <p className="text-gray-700 mb-4">
        Thanks for choosing Sendies. We can&apos;t wait to help you make sending money quick, easy, and fun!
      </p>

      <p className="text-gray-700 mb-4">Catch you on the flip side,</p>
      <p className="font-semibold text-lg">The Sendies Team</p>

      <hr className="my-6" />

      <p className="text-center text-gray-500 text-sm mt-6">
        Need a hand or have questions? Our friendly support team has got your back at{" "}
        <a href="mailto:hello@sendies.app" className="text-blue-500 hover:underline">
          hello@sendies.app
        </a>
        .
      </p>
    </div>
  );
}
