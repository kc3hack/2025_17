"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Map, Info } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Search className="h-6 w-6 text-green-500" />,
      title: "好みの分析",
      description: "あなたの興味や好みを詳しく分析します"
    },
    {
      icon: <Map className="h-6 w-6 text-green-500" />,
      title: "観光地診断",
      description: "最適な観光スポットをご提案します"
    },
    {
      icon: <Info className="h-6 w-6 text-green-500" />,
      title: "詳細情報",
      description: "観光地の詳しい情報を確認できます"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景のグラデーションレイヤー */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100" />

      <div 
        className="absolute inset-0 bg-no-repeat bg-cover opacity-100"
        style={{
          backgroundImage: "url('/背景フィルタ.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* メインコンテンツ */}
      <div className="relative z-10 p-6">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-8 w-8 text-green-500" />
              <h1 className="text-4xl font-bold text-green-500 font-poppins">せや、旅しよ！</h1>
            </div>
          </header>

          <Card className="mb-8 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                あなたにぴったりの関西の観光地を見つけましょう！
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-center mb-8">
                選択式の質問に答えるだけで、あなたの好みや興味に合った関西の観光スポットをご紹介します。
              </p>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-greens-600 text-white px-8 py-6 text-lg rounded-full mb-8"
                >
                  診断を始める
                </Button>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-4 text-center">
                  このアプリでできること
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-green-50 p-3 rounded-full mb-4">
                          {feature.icon}
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
          background-image: linear-gradient(
            45deg,
            #fee2e2,
            #fef3c7,
            #dcfce7,
            #dbeafe,
            #f3e8ff,
            #ffe4e6
          );
        }
      `}</style>
    </div>
  );
};

export default Home;