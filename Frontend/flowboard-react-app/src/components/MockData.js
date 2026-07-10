// Mock Users
export const currentUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@flowboard.io',
  avatarUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  role: 'owner'
}

export const users = [
  currentUser,
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@flowboard.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    role: 'admin'
  },
  {
    id: '3',
    name: 'Mike Williams',
    email: 'mike@flowboard.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'member'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@flowboard.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    role: 'member'
  },
  {
    id: '5',
    name: 'James Brown',
    email: 'james@flowboard.io',
    avatarUrl :
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    role: 'member'
  }
]

// Labels
export const labels = [
  { id: '1', name: 'Bug', color: 'bg-destructive text-destructive-foreground' },
  { id: '2', name: 'Feature', color: 'bg-primary text-primary-foreground' },
  { id: '3', name: 'Enhancement', color: 'bg-success text-success-foreground' },
  { id: '4', name: 'Documentation', color: 'bg-warning text-warning-foreground' },
  { id: '5', name: 'Design', color: 'bg-chart-4 text-foreground' }
]

// Mock Projects
export const projects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design',
    members: [users[0], users[1], users[2]],
    lastActivity: '2 hours ago',
    boardCount: 3,
    taskCount: 24
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build a cross-platform mobile application',
    members: [users[0], users[3], users[4]],
    lastActivity: '5 hours ago',
    boardCount: 2,
    taskCount: 18
  },
  {
    id: '3',
    name: 'Marketing Campaign Q2',
    description: 'Plan and execute Q2 marketing initiatives',
    members: [users[1], users[2]],
    lastActivity: '1 day ago',
    boardCount: 1,
    taskCount: 12
  },
  {
    id: '4',
    name: 'Product Launch',
    description: 'Coordinate the launch of our new product line',
    members: users,
    lastActivity: '3 hours ago',
    boardCount: 4,
    taskCount: 32
  }
]

// Mock Tasks
export const tasks = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create mockups for the new landing page design',
    assignees: [users[1]],
    dueDate: '2024-03-25',
    labels: [labels[4], labels[1]],
    priority: 'high',
    columnId: '1'
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Set up OAuth and email authentication',
    assignees: [users[2], users[0]],
    dueDate: '2024-03-26',
    labels: [labels[1]],
    priority: 'high',
    columnId: '2'
  },
  {
    id: '3',
    title: 'Fix navigation bug',
    description: 'Navigation menu not closing on mobile',
    assignees: [users[2]],
    dueDate: '2024-03-24',
    labels: [labels[0]],
    priority: 'medium',
    columnId: '2'
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints',
    assignees: [users[3]],
    dueDate: '2024-03-28',
    labels: [labels[3]],
    priority: 'low',
    columnId: '1'
  },
  {
    id: '5',
    title: 'Performance optimization',
    description: 'Improve page load times and bundle size',
    assignees: [users[0], users[2]],
    dueDate: '2024-03-30',
    labels: [labels[2]],
    priority: 'medium',
    columnId: '3'
  },
  {
    id: '6',
    title: 'User testing sessions',
    description: 'Conduct usability testing with 10 users',
    assignees: [users[1], users[3]],
    dueDate: '2024-03-27',
    labels: [labels[1]],
    priority: 'high',
    columnId: '1'
  }
]

// Mock Columns
export const columns = [
  {
    id: '1',
    title: 'To Do',
    tasks: tasks.filter(t => t.columnId === '1')
  },
  {
    id: '2',
    title: 'In Progress',
    tasks: tasks.filter(t => t.columnId === '2')
  },
  {
    id: '3',
    title: 'In Review',
    tasks: tasks.filter(t => t.columnId === '3')
  },
  {
    id: '4',
    title: 'Done',
    tasks: []
  }
]

// Mock Boards
export const boards = [
  {
    id: '1',
    name: 'Sprint 1',
    projectId: '1',
    columns,
    members: [users[0], users[1], users[2]],
    background: 'bg-gradient-to-br from-primary/10 to-accent/10'
  },
  {
    id: '2',
    name: 'Design Tasks',
    projectId: '1',
    columns: [
      {
        id: '1',
        title: 'Backlog',
        tasks: []
      },
      {
        id: '2',
        title: 'In Design',
        tasks: []
      },
      {
        id: '3',
        title: 'Review',
        tasks: []
      },
      {
        id: '4',
        title: 'Approved',
        tasks: []
      }
    ],
    members: [users[1], users[3]],
    background: 'bg-gradient-to-br from-chart-2/10 to-chart-3/10'
  }
]

// Mock Activities
export const activities = [
  {
    id: '1',
    user: users[1],
    action: 'completed',
    target: 'Design system update',
    timestamp: '5 minutes ago'
  },
  {
    id: '2',
    user: users[2],
    action: 'moved',
    target: 'API integration to In Review',
    timestamp: '15 minutes ago'
  },
  {
    id: '3',
    user: users[0],
    action: 'created',
    target: 'New board: Sprint 2',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    user: users[3],
    action: 'commented on',
    target: 'Landing page design',
    timestamp: '2 hours ago'
  },
  {
    id: '5',
    user: users[4],
    action: 'joined',
    target: 'Website Redesign project',
    timestamp: '3 hours ago'
  }
]

// Dashboard Stats
export const dashboardStats = {
  totalProjects: 4,
  tasksDueToday: 3,
  completedTasks: 47,
  activeCollaborators: 5
}

// Analytics Data
export const analyticsData = {
  tasksCompletedOverTime: [
    { date: 'Mon', tasks: 12 },
    { date: 'Tue', tasks: 19 },
    { date: 'Wed', tasks: 15 },
    { date: 'Thu', tasks: 22 },
    { date: 'Fri', tasks: 18 },
    { date: 'Sat', tasks: 8 },
    { date: 'Sun', tasks: 5 }
  ],

  tasksPerMember: [
    { name: 'Alex', completed: 24, inProgress: 5 },
    { name: 'Sarah', completed: 18, inProgress: 8 },
    { name: 'Mike', completed: 15, inProgress: 3 },
    { name: 'Emily', completed: 12, inProgress: 6 },
    { name: 'James', completed: 10, inProgress: 4 }
  ],

  projectHealth: [
    { project: 'Website Redesign', health: 85 },
    { project: 'Mobile App', health: 72 },
    { project: 'Marketing Q2', health: 90 },
    { project: 'Product Launch', health: 68 }
  ]
}


