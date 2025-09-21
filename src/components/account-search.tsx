"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccountSearchProps {
  onSearch: (searchTerm: string, searchType: 'sender' | 'receiver') => void;
}

export function AccountSearch({ onSearch }: AccountSearchProps) {
  const [senderTerm, setSenderTerm] = useState("");
  const [receiverTerm, setReceiverTerm] = useState("");

  const handleSenderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(senderTerm, 'sender');
  };
  
  const handleReceiverSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(receiverTerm, 'receiver');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Transactions</CardTitle>
        <CardDescription>
          Enter a sender or receiver account name to see all their transactions and risk details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sender">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sender">Search by Sender</TabsTrigger>
            <TabsTrigger value="receiver">Search by Receiver</TabsTrigger>
          </TabsList>
          <TabsContent value="sender" className="mt-4">
            <form onSubmit={handleSenderSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter sender account name..."
                value={senderTerm}
                onChange={(e) => setSenderTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search Sender
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="receiver" className="mt-4">
             <form onSubmit={handleReceiverSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter receiver account name..."
                value={receiverTerm}
                onChange={(e) => setReceiverTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search Receiver
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
