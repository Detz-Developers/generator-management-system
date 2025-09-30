
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBOyYbKXtADDzMPqWCFo6Qm1zuQ_z9O0mo';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateAnalysis(prompt: string, data: any) {
  try {
    // Use the supported model name
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const fullPrompt = `
    You are an expert generator maintenance analyst. Analyze the following data and provide insights based on this prompt: ${prompt}
    
    Data: ${JSON.stringify(data, null, 2)}
    
    Please provide a concise, actionable analysis with specific recommendations.
    Format your response in clear sections with bullet points where appropriate.
    `;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('AI_SERVICE_UNAVAILABLE');
  }
}

export async function generateReportSummary(generators: any[], issues: any[], serviceLogs: any[]) {
  try {
    const activeIssues = issues.filter(i => i.status !== 'closed');
    const recentServices = serviceLogs.filter(s => {
      const serviceDate = new Date(s.serviceDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return serviceDate >= thirtyDaysAgo;
    });

    const prompt = `
    Generate a comprehensive report summary for a generator management system with the following data:
    - Total Generators: ${generators.length} units
    - Active Generators: ${generators.filter(g => g.status?.toLowerCase() === 'active').length}
    - Generators Under Repair: ${generators.filter(g => g.status?.toLowerCase() === 'under repair').length}
    - Active Issues: ${activeIssues.length}
    - Recent Service Records (30 days): ${recentServices.length}
    - Total Service Records: ${serviceLogs.length}
    
    Please provide:
    1. Overall system health status and performance summary
    2. Key maintenance recommendations based on service history
    3. Critical issues that need immediate attention
    4. Performance trends and patterns
    5. Preventive maintenance suggestions
    `;
    
    return await generateAnalysis(prompt, { 
      generators: generators.slice(0, 10), // Limit data size
      activeIssues: activeIssues.slice(0, 10), 
      recentServices: recentServices.slice(0, 10) 
    });
  } catch (error) {
    throw error;
  }
}

export function generateFallbackReport(generators: any[], issues: any[], serviceLogs: any[]) {
  const activeGenerators = generators.filter(g => g.status?.toLowerCase() === 'active');
  const underRepairGenerators = generators.filter(g => g.status?.toLowerCase() === 'under repair');
  const activeIssues = issues.filter(i => i.status !== 'closed');
  const highPriorityIssues = activeIssues.filter(i => i.severity?.toLowerCase() === 'high');
  
  const recentServices = serviceLogs.filter(s => {
    const serviceDate = new Date(s.serviceDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return serviceDate >= thirtyDaysAgo;
  });

  const totalServiceCost = serviceLogs.reduce((sum, log) => sum + (log.cost || 0), 0);
  const avgServiceCost = serviceLogs.length > 0 ? totalServiceCost / serviceLogs.length : 0;

  return `
## System Health Summary

### Overall Status
• **Total Generators**: ${generators.length} units
• **Active Generators**: ${activeGenerators.length} (${((activeGenerators.length / generators.length) * 100).toFixed(1)}%)
• **Generators Under Repair**: ${underRepairGenerators.length}
• **System Availability**: ${((activeGenerators.length / generators.length) * 100).toFixed(1)}%

### Issue Management
• **Active Issues**: ${activeIssues.length}
• **High Priority Issues**: ${highPriorityIssues.length}
• **Issue Resolution Rate**: ${issues.length > 0 ? (((issues.length - activeIssues.length) / issues.length) * 100).toFixed(1) : 0}%

### Maintenance Overview
• **Total Service Records**: ${serviceLogs.length}
• **Recent Services (30 days)**: ${recentServices.length}
• **Average Service Cost**: $${avgServiceCost.toFixed(2)}
• **Total Service Investment**: $${totalServiceCost.toFixed(2)}

### Key Recommendations
${highPriorityIssues.length > 0 ? `• **Immediate Action Required**: ${highPriorityIssues.length} high-priority issues need attention` : '• No critical issues requiring immediate attention'}
${underRepairGenerators.length > 0 ? `• **Repair Status**: Monitor ${underRepairGenerators.length} generators currently under repair` : '• All generators are operational or in standby'}
${recentServices.length === 0 ? '• **Maintenance Alert**: No recent service activity - consider scheduling preventive maintenance' : `• **Maintenance Activity**: ${recentServices.length} services completed in the last 30 days`}

### Performance Insights
• **Reliability Score**: ${(100 - (activeIssues.length / generators.length) * 10).toFixed(1)}%
• **Maintenance Frequency**: ${(serviceLogs.length / generators.length).toFixed(1)} services per generator
• **System Uptime**: Estimated ${((activeGenerators.length / generators.length) * 100).toFixed(1)}%

*This report was generated using system analytics. For detailed AI insights, please try again when the AI service is available.*
  `.trim();
}
  

