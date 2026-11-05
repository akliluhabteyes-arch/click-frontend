import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Zap } from "lucide-react";
import { useSite } from "@/context/SiteDataContext";
import { sendChatMessage } from "@/lib/api";

interface Message {
  role: "user" | "bot";
  content: string;
}

const MIN_TYPING_MS = 600; // keeps the "typing" animation natural even when the API is fast

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const ChatWidget = () => {
  const { chat, settings } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", content: chat.welcomeMessage }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setIsTyping(true);

    const started = Date.now();
    let reply: string;
    try {
      reply = (await sendChatMessage(content)).reply;
    } catch {
      reply = `Sorry, I'm having trouble connecting right now. Please contact us at **${settings.email}** or **${settings.phone}**.`;
    }
    const wait = MIN_TYPING_MS - (Date.now() - started);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));

    setIsTyping(false);
    setMessages((prev) => [...prev, { role: "bot", content: reply }]);
  };

  const handleSend = () => sendMessage(input);

  // Simple markdown-like rendering (content is HTML-escaped first)
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      let processed = escapeHtml(line)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      if (line.startsWith("• ") || line.startsWith("- ")) {
        processed = `<span class="block pl-2">${processed}</span>`;
      }

      return <span key={i} className="block" dangerouslySetInnerHTML={{ __html: processed || "&nbsp;" }} />;
    });
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-border cursor-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[70px] sm:bottom-24 right-2 sm:right-6 z-50 w-[calc(100vw-16px)] sm:w-[380px] max-h-[80vh] sm:max-h-[500px] rounded-2xl overflow-hidden border border-border/50 glass flex flex-col shadow-2xl shadow-primary/10"
          >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-border/50 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-foreground text-sm">{chat.botName}</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="sm:hidden text-muted-foreground p-1">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 min-h-[200px] max-h-[50vh] sm:max-h-[300px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "bot" ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    {msg.role === "bot" ? <Bot size={12} className="text-primary" /> : <User size={12} className="text-foreground" />}
                  </div>
                  <div className={`rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 max-w-[80%] text-xs sm:text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-secondary text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {msg.role === "bot" ? renderContent(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 bg-primary/20">
                    <Bot size={12} className="text-primary" />
                  </div>
                  <div className="rounded-xl px-3.5 py-2.5 bg-secondary flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 2 && (
              <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-1.5">
                {chat.quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage(action.query)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Zap size={10} />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our products..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0"
                >
                  <Send size={14} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
