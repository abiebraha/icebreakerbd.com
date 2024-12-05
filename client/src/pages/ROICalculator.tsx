import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calculator, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    callingHours: 6,
    monthlyCost: 5000,
    callsPerHour: 12,
    dmMeetingRate: 2,
    meetingToOpportunityRate: 30,
    opportunityToCloseRatio: 20,
    averageSpendPerCustomer: 25000,
    salesCycle: 3,
    numberOfSDRs: 1
  });

  // Reset form to defaults when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem("hasReloaded")) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  const [monthlyResults, setMonthlyResults] = useState<Array<{
    month: number;
    meetingsBooked: number;
    opportunities: number;
    salesWon: number;
    revenue: number;
    cumulativeRevenue: number;
  }>>([]);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    calculateROI();
  }, [formData]);

  const calculateROI = () => {
    let cumulativeRevenue = 0;
    const results = [];

    for (let month = 1; month <= 12; month++) {
      const rampUpFactor = month === 1 ? 0.15 
        : month === 2 ? 0.30 
        : month === 3 ? 0.40 
        : month === 4 ? 0.65 
        : month === 5 ? 0.85 
        : 1;

      const callsMade = formData.callingHours * formData.callsPerHour * formData.numberOfSDRs * rampUpFactor;
      const meetingsBooked = callsMade * (formData.dmMeetingRate / 100);
      const opportunities = meetingsBooked * (formData.meetingToOpportunityRate / 100);
      const salesWon = month > formData.salesCycle ? opportunities * (formData.opportunityToCloseRatio / 100) : 0;

      let revenue = month > formData.salesCycle ? salesWon * formData.averageSpendPerCustomer : 0;
      revenue -= formData.monthlyCost;
      cumulativeRevenue += revenue;

      results.push({
        month,
        meetingsBooked,
        opportunities,
        salesWon,
        revenue,
        cumulativeRevenue
      });
    }

    setMonthlyResults(results);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value) || 0
    }));
  };

  const exportToPDF = async () => {
    if (!resultsRef.current) return;

    const logoUrl = '/Color logo - no background.png';
    const canvas = await html2canvas(resultsRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    // Add logo
    const logoImg = new Image();
    logoImg.src = logoUrl;
    
    await new Promise((resolve) => {
      logoImg.onload = resolve;
      // Handle error case
      logoImg.onerror = () => {
        console.error('Error loading logo');
        resolve(null);
      };
    });

    const logoWidth = 150;
    const logoHeight = 100;
    const xLogo = (pdfWidth - logoWidth) / 2;
    
    try {
      pdf.addImage(logoImg, 'PNG', xLogo, 10, logoWidth, logoHeight);
    } catch (error) {
      console.error('Error adding logo to PDF:', error);
    }

    // Add the table content below the logo
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = logoHeight + 30;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('sdr-roi-results.pdf');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#123e74]/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              SDR Team ROI
              <br />
              <span className="text-[#123e74]">Calculator</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Calculate the potential return on investment from building your SDR team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="callingHours">Calling Hours (per day)</Label>
                      <Input
                        id="callingHours"
                        name="callingHours"
                        type="number"
                        min="1"
                        value={formData.callingHours}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthlyCost">Monthly Cost ($)</Label>
                      <Input
                        id="monthlyCost"
                        name="monthlyCost"
                        type="number"
                        min="0"
                        value={formData.monthlyCost}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="callsPerHour">Calls Per Hour</Label>
                      <Input
                        id="callsPerHour"
                        name="callsPerHour"
                        type="number"
                        min="0"
                        value={formData.callsPerHour}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dmMeetingRate">DM Meeting Rate (%)</Label>
                      <Input
                        id="dmMeetingRate"
                        name="dmMeetingRate"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.dmMeetingRate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meetingToOpportunityRate">Meeting to Opportunity Rate (%)</Label>
                      <Input
                        id="meetingToOpportunityRate"
                        name="meetingToOpportunityRate"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.meetingToOpportunityRate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="opportunityToCloseRatio">Opportunity to Close Ratio (%)</Label>
                      <Input
                        id="opportunityToCloseRatio"
                        name="opportunityToCloseRatio"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.opportunityToCloseRatio}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="averageSpendPerCustomer">Average Spend Per Customer ($)</Label>
                      <Input
                        id="averageSpendPerCustomer"
                        name="averageSpendPerCustomer"
                        type="number"
                        min="0"
                        value={formData.averageSpendPerCustomer}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salesCycle">Sales Cycle (months)</Label>
                      <Input
                        id="salesCycle"
                        name="salesCycle"
                        type="number"
                        min="1"
                        value={formData.salesCycle}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numberOfSDRs">Number of SDRs</Label>
                      <Input
                        id="numberOfSDRs"
                        name="numberOfSDRs"
                        type="number"
                        min="1"
                        value={formData.numberOfSDRs}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div ref={resultsRef}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900">Monthly Breakdown</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={exportToPDF}
                      >
                        <Download className="w-4 h-4" />
                        Export PDF
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Meetings</TableHead>
                            <TableHead>Opportunities</TableHead>
                            <TableHead>Sales Won</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Cumulative</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {monthlyResults.map((result) => (
                            <TableRow key={result.month}>
                              <TableCell>{result.month}</TableCell>
                              <TableCell>{result.meetingsBooked.toFixed(1)}</TableCell>
                              <TableCell>{result.opportunities.toFixed(1)}</TableCell>
                              <TableCell>{result.salesWon.toFixed(1)}</TableCell>
                              <TableCell>${result.revenue.toLocaleString()}</TableCell>
                              <TableCell>${result.cumulativeRevenue.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href={import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/icebreakerbd/meeting-with-abie-braha"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#123e74] hover:bg-[#1a4e8f] transition-all duration-300 hover:scale-105"
              >
                <Calculator className="w-4 h-4" />
                Schedule a Call to Learn More
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
