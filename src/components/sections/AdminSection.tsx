
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, PieChart, LineChart, Bar, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function AdminSection() {
  const { isAdmin } = useAuth();
  const [salesData] = useState([
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 7000 },
    { name: 'May', sales: 5000 },
    { name: 'Jun', sales: 9000 },
  ]);

  const [themeData] = useState([
    { name: 'E-commerce', value: 45 },
    { name: 'Course', value: 30 },
    { name: 'Portfolio', value: 25 },
  ]);

  const [userData] = useState([
    { name: 'Week 1', users: 10 },
    { name: 'Week 2', users: 15 },
    { name: 'Week 3', users: 25 },
    { name: 'Week 4', users: 30 },
  ]);

  const COLORS = ['#F97316', '#9b87f5', '#D946EF'];

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="transparent-panel rounded-lg p-8 max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center font-space">Access Denied</h2>
          <p className="text-gray-200 text-center">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-10 overflow-auto py-20"
    >
      <div className="transparent-panel rounded-lg p-8 max-w-6xl w-full mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 font-space">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl">42</CardTitle>
              <CardDescription className="text-gray-300">Active Users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-400 flex items-center">
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl">15</CardTitle>
              <CardDescription className="text-gray-300">New Sign Ups (30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-400 flex items-center">
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>+5% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl">$12,450</CardTitle>
              <CardDescription className="text-gray-300">Monthly Revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-400 flex items-center">
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>+18% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="users">User Growth</TabsTrigger>
            <TabsTrigger value="themes">Theme Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <Card className="bg-white/10 border-white/20 text-white p-4">
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription className="text-gray-300">Revenue for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(30,30,30,0.8)', 
                          borderColor: 'rgba(255,255,255,0.2)',
                          color: 'white'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#9b87f5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card className="bg-white/10 border-white/20 text-white p-4">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription className="text-gray-300">New users for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(30,30,30,0.8)', 
                          borderColor: 'rgba(255,255,255,0.2)',
                          color: 'white'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#0EA5E9" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="themes">
            <Card className="bg-white/10 border-white/20 text-white p-4">
              <CardHeader>
                <CardTitle>Theme Distribution</CardTitle>
                <CardDescription className="text-gray-300">Popularity of each theme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={themeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {themeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(30,30,30,0.8)', 
                          borderColor: 'rgba(255,255,255,0.2)',
                          color: 'white'
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
