function NCTSAApp() {
  return (
    <>
      <div className='prose prose-lg max-w-none'>
        <p className='mb-6 text-xl leading-relaxed text-gray-300'>
          When I first heard about the opportunity to create an app for the
          North Carolina Technology Student Association (TSA), I had never built
          a production mobile application before. What started as a ambitious
          project turned into a journey that would teach me more about software
          development, user experience, and project management than any tutorial
          ever could.
        </p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold text-gray-200'>
          The Challenge
        </h2>
        <p className='mb-6 leading-relaxed text-gray-300'>
          The North Carolina TSA needed a centralized platform where students,
          advisors, and organizers could access event information, schedules,
          results, and important announcements. The existing solution was a
          patchwork of websites, email chains, and printed materials that made
          it difficult for the 2,000 TSA members in the conference center to
          stay informed.
        </p>

        <div className='my-8 rounded-lg bg-stone-900 p-6'>
          <h3 className='mb-3 text-lg font-semibold'>Key Requirements:</h3>
          <ul className='list-inside list-disc space-y-2 text-gray-300'>
            <li>Real-time event schedules and updates</li>
            <li>Competition results</li>
            <li>Push notifications for important announcements</li>
            <li>Offline functionality for areas with poor connectivity</li>
            <li>
              User-friendly interface for students of all technical levels
            </li>
          </ul>
        </div>

        <h2 className='mt-8 mb-4 text-2xl font-semibold text-gray-200'>
          Learning on the Fly
        </h2>
        <p className='mb-6 leading-relaxed text-gray-300'>
          With a tight deadline of just 6 weeks before the state conference, I
          dove headfirst into React Native development. The learning curve was
          steep - I had to master not just the framework, but also understand
          mobile UI patterns, state management, API integration, and deployment
          processes for both iOS and Android.
        </p>

        <p className='mb-6 leading-relaxed text-gray-300'>
          The first week was particularly challenging. I spent countless hours
          debugging simple issues that would take experienced developers minutes
          to solve. But with each small victory - getting the navigation
          working, successfully fetching data from the API, implementing push
          notifications - my confidence grew.
        </p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold text-gray-200'>
          Technical Stack
        </h2>
        <p className='mb-4 leading-relaxed text-gray-300'>
          For this project, I chose a modern tech stack that would allow for
          rapid development while maintaining scalability:
        </p>

        <div className='my-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='rounded-lg bg-stone-900 p-6'>
            <h4 className='mb-3 font-semibold text-blue-300'>Frontend</h4>
            <ul className='space-y-1 text-blue-200'>
              <li>• React Native with Expo</li>
              <li>• TypeScript for type safety</li>
              <li>• React Navigation</li>
              <li>• AsyncStorage for offline data</li>
            </ul>
          </div>
          <div className='rounded-lg bg-stone-900 p-6'>
            <h4 className='mb-3 font-semibold text-green-300'>Backend</h4>
            <ul className='space-y-1 text-green-200'>
              <li>• Go with Gin</li>
              <li>• PostgreSQL for storage</li>
              <li>• NextJS for management dashboard</li>
              <li>• RESTful API design</li>
            </ul>
          </div>
        </div>

        <h2 className='mt-8 mb-4 text-2xl font-semibold text-gray-200'>
          Deployment and Impact
        </h2>
        <p className='mb-6 leading-relaxed text-gray-300'>
          The app launched just two days before the state conference, and the
          results exceeded all expectations. On the first day of the conference,
          over half of the members downloaded the app and were activily using
          it. By the end of the weekend, over 800k+ requests were answered
          without a single error on the backend.
        </p>

        <div className='my-8 border-l-4 border-yellow-400 bg-stone-900 p-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-yellow-600'>
                <strong>Success Metrics:</strong> 1200+ downloads in the first 2
                days, positive reviews from current members, and instant
                notifications for conference management.
              </p>
            </div>
          </div>
        </div>

        <h2 className='mt-8 mb-4 text-2xl font-semibold text-gray-200'>
          Lessons Learned
        </h2>
        <p className='mb-6 leading-relaxed text-gray-300'>
          This project taught me that sometimes the best way to learn is to jump
          into the deep end. While it was stressful at times, the experience of
          building something that real people would use daily pushed me to write
          better code, think more carefully about user experience, and develop
          problem-solving skills that no classroom could provide.
        </p>

        <p className='mb-6 leading-relaxed text-gray-300'>
          The success of the NC TSA app opened doors to other opportunities and
          gave me the confidence to tackle even more ambitious projects. It
          proved that with determination, good resources, and a willingness to
          learn, it&apos;s possible to go from zero to production-ready in a
          remarkably short time.
        </p>

        <div className='mt-8 border-t border-gray-200 pt-8'>
          <p className='text-gray-400 italic'>
            The North Carolina TSA app continues to serve thousands of students
            across the state, with new features and improvements being added
            regularly based on user feedback.
          </p>
        </div>
      </div>
    </>
  );
}

const blog = {
  name: 'NCTSAApp',
  publishedAt: Date.parse(
    'Fri Jul 11 2025 13:01:13 GMT-0400 (Eastern Daylight Time)'
  ),
  updatedAt: null,
  readTime: '8 min',
  image: '/images/blogs/nctsa.png',
  title: 'North Carolina TSA App Project',
  description:
    'Learn about my journey making my first production app, from never having coded an app before to being deployed to hundreds of users weeks later.',
  component: <NCTSAApp />,
}

export default blog
