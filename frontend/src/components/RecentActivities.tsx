interface Activity {
  id: string;
  description: string;
  timeAgo: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const activities: Activity[] = [
  {
    id: '1',
    description: 'Generator #G001 service completed',
    timeAgo: '2 hours ago',
    status: 'completed'
  },
  {
    id: '2',
    description: 'Generator #G024 marked as under repair',
    timeAgo: '4 hours ago',
    status: 'in-progress'
  },
  {
    id: '3',
    description: 'Battery replacement for Generator G#045',
    timeAgo: '8 hours ago',
    status: 'pending'
  },
  {
    id: '4',
    description: 'Maintenance task assigned to Sahan Perera',
    timeAgo: '2 hours ago',
    status: 'in-progress'
  }
];

const getStatusColor = (status: Activity['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'in-progress':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: Activity['status']) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In-progress';
    case 'pending':
      return 'Pending';
    default:
      return 'Unknown';
  }
};

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Recent Activities</h2>
        <p className="text-gray-600">Latest system updates</p>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 text-sm mb-1">{activity.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {getStatusText(activity.status)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
