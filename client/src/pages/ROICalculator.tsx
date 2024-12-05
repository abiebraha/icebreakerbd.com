import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    numberOfSDRs: 1,
    averageDealSize: 10000,
    conversionRate: 20,
    meetingsPerMonth: 20,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const {
      numberOfSDRs,
      averageDealSize,
      conversionRate,
      meetingsPerMonth,
    } = formData;

    const annualMeetings = meetingsPerMonth * 12 * numberOfSDRs;
    const annualDeals = (annualMeetings * (conversionRate / 100));
    const annualRevenue = annualDeals * averageDealSize;
    const monthlyRevenue = annualRevenue / 12;

    return {
      annualMeetings,
      annualDeals: annualDeals.toFixed(1),
      annualRevenue: annualRevenue.toLocaleString(),
      monthlyRevenue: (monthlyRevenue).toLocaleString(),
    };
  };

  const results = calculateROI();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value) || 0
    }));
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
        <div className="max-w-4xl mx-auto">
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

                    <div className="space-y-2">
                      <Label htmlFor="averageDealSize">Average Deal Size ($)</Label>
                      <Input
                        id="averageDealSize"
                        name="averageDealSize"
                        type="number"
                        min="0"
                        value={formData.averageDealSize}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                      <Input
                        id="conversionRate"
                        name="conversionRate"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.conversionRate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meetingsPerMonth">Meetings Per Month (per SDR)</Label>
                      <Input
                        id="meetingsPerMonth"
                        name="meetingsPerMonth"
                        type="number"
                        min="0"
                        value={formData.meetingsPerMonth}
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
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Projected Results</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-slate-600">Annual Meetings</p>
                      <p className="text-2xl font-bold text-[#123e74]">
                        {results.annualMeetings}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600">Annual Deals</p>
                      <p className="text-2xl font-bold text-[#123e74]">
                        {results.annualDeals}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-[#123e74]">
                        ${results.monthlyRevenue}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600">Annual Revenue</p>
                      <p className="text-2xl font-bold text-[#123e74]">
                        ${results.annualRevenue}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://calendly.com/icebreakerbd/meeting-with-abie-braha" 
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
