function NCTSAApp() {
	return (
		<>
			<div className="prose prose-lg max-w-none">
				<p className="text-xl text-gray-300 leading-relaxed mb-6">
					When I first heard about the opportunity to create an app for the North Carolina Technology Student Association (TSA), 
					I had never built a production mobile application before. What started as a ambitious project turned into a journey 
					that would teach me more about software development, user experience, and project management than any tutorial ever could.
				</p>

				<h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">The Challenge</h2>
				<p className="text-gray-300 leading-relaxed mb-6">
					The North Carolina TSA needed a centralized platform where students, advisors, and organizers could access event information, 
					schedules, results, and important announcements. The existing solution was a patchwork of websites, email chains, and 
					printed materials that made it difficult for the 10,000+ TSA members across the state to stay informed.
				</p>

				<div className="bg-stone-900 p-6 rounded-lg my-8">
					<h3 className="text-lg font-semibold mb-3">Key Requirements:</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-300">
						<li>Real-time event schedules and updates</li>
						<li>Competition results and rankings</li>
						<li>Push notifications for important announcements</li>
						<li>Offline functionality for areas with poor connectivity</li>
						<li>User-friendly interface for students of all technical levels</li>
					</ul>
				</div>

				<h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">Learning on the Fly</h2>
				<p className="text-gray-300 leading-relaxed mb-6">
					With a tight deadline of just 6 weeks before the state conference, I dove headfirst into React Native development. 
					The learning curve was steep - I had to master not just the framework, but also understand mobile UI patterns, 
					state management, API integration, and deployment processes for both iOS and Android.
				</p>

				<img 
					src="/images/robotics.jpeg" 
					alt="Development process" 
					className="w-full h-48 object-cover rounded-lg shadow-md my-8"
				/>

				<p className="text-gray-300 leading-relaxed mb-6">
					The first week was particularly challenging. I spent countless hours debugging simple issues that would take 
					experienced developers minutes to solve. But with each small victory - getting the navigation working, 
					successfully fetching data from the API, implementing push notifications - my confidence grew.
				</p>

				<h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">Technical Stack</h2>
				<p className="text-gray-300 leading-relaxed mb-4">
					For this project, I chose a modern tech stack that would allow for rapid development while maintaining scalability:
				</p>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
					<div className="bg-blue-50 p-6 rounded-lg">
						<h4 className="font-semibold text-blue-900 mb-3">Frontend</h4>
						<ul className="text-blue-800 space-y-1">
							<li>• React Native with Expo</li>
							<li>• TypeScript for type safety</li>
							<li>• React Navigation</li>
							<li>• AsyncStorage for offline data</li>
						</ul>
					</div>
					<div className="bg-green-50 p-6 rounded-lg">
						<h4 className="font-semibold text-green-900 mb-3">Backend</h4>
						<ul className="text-green-800 space-y-1">
							<li>• Node.js with Express</li>
							<li>• MongoDB for data storage</li>
							<li>• Firebase for push notifications</li>
							<li>• RESTful API design</li>
						</ul>
					</div>
				</div>

				<h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">Deployment and Impact</h2>
				<p className="text-gray-300 leading-relaxed mb-6">
					The app launched just two days before the state conference, and the results exceeded all expectations. 
					Within the first week, we had over 500 downloads, and by the end of the conference, nearly 80% of attendees 
					were actively using the app to check schedules and results.
				</p>

				<div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
					<div className="flex">
						<div className="ml-3">
							<p className="text-sm text-yellow-700">
								<strong>Success Metrics:</strong> 800+ downloads in the first month, 4.7-star rating on app stores, 
								and a 60% reduction in information-related questions at the help desk during events.
							</p>
						</div>
					</div>
				</div>

				<h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">Lessons Learned</h2>
				<p className="text-gray-300 leading-relaxed mb-6">
					This project taught me that sometimes the best way to learn is to jump into the deep end. 
					While it was stressful at times, the experience of building something that real people would use daily 
					pushed me to write better code, think more carefully about user experience, and develop problem-solving skills 
					that no classroom could provide.
				</p>

				<p className="text-gray-300 leading-relaxed mb-6">
					The success of the NC TSA app opened doors to other opportunities and gave me the confidence to tackle 
					even more ambitious projects. It proved that with determination, good resources, and a willingness to learn, 
					it's possible to go from zero to production-ready in a remarkably short time.
				</p>

				<img 
					src="/images/smathhacks.jpg" 
					alt="Conference presentation" 
					className="w-full h-48 object-cover rounded-lg shadow-md my-8"
				/>

				<div className="border-t border-gray-200 pt-8 mt-8">
					<p className="text-gray-400 italic">
						The North Carolina TSA app continues to serve thousands of students across the state, 
						with new features and improvements being added regularly based on user feedback.
					</p>
				</div>
			</div>
		</>
	)
}

export default {
	name: "NCTSAApp",
	publishedAt: Date.parse("Fri Jul 11 2025 13:01:13 GMT-0400 (Eastern Daylight Time)"),
	updatedAt: null,
	readTime: "8 min",
	image: "/images/blogs/nctsa.png",
	title: "North Carolina TSA App Project",
	description: "Learn about my journey making my first production app, from never having coded an app before to being deployed to hundreds of users weeks later.",
	component: <NCTSAApp />
}