import { useEffect, useState } from 'react';
import { Search, Grid, Plus, Filter, BookOpen, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { knowledgeBaseService, KnowledgeItem } from '../services/knowledgeBaseService';

// Magic UI Components
import { BentoGrid } from '../features/ui/magic/bento-grid';
import { Particles } from '../features/ui/magic/particles';
import { AnimatedGradientText } from '../features/ui/magic/animated-gradient-text';
import { BorderBeam } from '../features/ui/magic/border-beam';
import { ShimmerButton } from '../features/ui/magic/shimmer-button';

// Keep existing modals and functionality
import { AddKnowledgeModal } from '../components/knowledge-base/AddKnowledgeModal';
import { CrawlingTab } from '../components/knowledge-base/CrawlingTab';
import { DocumentBrowser } from '../components/knowledge-base/DocumentBrowser';
import { CrawlProgressData } from '../types/crawl';

export const KnowledgeBasePageMagic = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [progressItems, setProgressItemsRaw] = useState<CrawlProgressData[]>([]);
  const [showCrawlingTab, setShowCrawlingTab] = useState(false);
  const [documentBrowserSourceId, setDocumentBrowserSourceId] = useState<string | null>(null);
  const [isDocumentBrowserOpen, setIsDocumentBrowserOpen] = useState(false);

  const { showToast } = useToast();

  const setProgressItems = (updater: CrawlProgressData[] | ((prev: CrawlProgressData[]) => CrawlProgressData[])) => {
    setProgressItemsRaw(prev => {
      const newItems = typeof updater === 'function' ? updater(prev) : updater;
      const itemMap = new Map(newItems.map(item => [item.progressId, item]));
      return Array.from(itemMap.values());
    });
  };

  const loadKnowledgeItems = async () => {
    try {
      setLoading(true);
      const response = await knowledgeBaseService.getKnowledgeItems({
        page: 1,
        per_page: 100
      });
      setKnowledgeItems(response.items);
      setTotalItems(response.total);
    } catch (error) {
      console.error('Failed to load knowledge items:', error);
      showToast('Failed to load knowledge items', 'error');
      setKnowledgeItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadKnowledgeItems();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter items based on search
  const filteredItems = knowledgeItems.filter(item =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.url?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#00d9ff"
        refresh
      />

      {/* Main Content */}
      <div className="relative z-10 px-8 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-5xl font-bold">
            <AnimatedGradientText>
              Knowledge Base
            </AnimatedGradientText>
          </h1>
          <p className="text-lg text-gray-400">
            Manage your AI-powered knowledge sources
          </p>
        </motion.div>

        {/* Search and Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex items-center gap-4"
        >
          {/* Search Input with Magic UI styling */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00d9ff]" />
            <input
              type="text"
              placeholder="Search knowledge items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#00d9ff]/30 bg-black/40 py-3 pl-12 pr-4 text-white backdrop-blur-sm transition-all focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/50"
            />
          </div>

          {/* Add Knowledge Button with Shimmer */}
          <ShimmerButton
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Knowledge
          </ShimmerButton>

          {/* Toggle Crawling Tab */}
          {progressItems.length > 0 && (
            <button
              onClick={() => setShowCrawlingTab(!showCrawlingTab)}
              className="flex items-center gap-2 rounded-xl border border-[#0066ff]/30 bg-[#0066ff]/10 px-4 py-3 text-white transition-all hover:bg-[#0066ff]/20"
            >
              <Zap className="h-5 w-5" />
              Crawling ({progressItems.length})
            </button>
          )}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 grid grid-cols-3 gap-4"
        >
          <div className="group relative overflow-hidden rounded-xl border border-[#00d9ff]/20 bg-black/40 p-6 backdrop-blur-sm">
            <BorderBeam size={200} duration={12} delay={0} />
            <Database className="mb-2 h-8 w-8 text-[#00d9ff]" />
            <h3 className="text-3xl font-bold text-white">{totalItems}</h3>
            <p className="text-sm text-gray-400">Total Sources</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-[#0066ff]/20 bg-black/40 p-6 backdrop-blur-sm">
            <BorderBeam size={200} duration={12} delay={4} />
            <BookOpen className="mb-2 h-8 w-8 text-[#0066ff]" />
            <h3 className="text-3xl font-bold text-white">{filteredItems.length}</h3>
            <p className="text-sm text-gray-400">Visible Items</p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-[#00d9ff]/20 bg-black/40 p-6 backdrop-blur-sm">
            <BorderBeam size={200} duration={12} delay={8} />
            <Zap className="mb-2 h-8 w-8 text-[#00d9ff]" />
            <h3 className="text-3xl font-bold text-white">{progressItems.length}</h3>
            <p className="text-sm text-gray-400">Active Crawls</p>
          </div>
        </motion.div>

        {/* Bento Grid for Knowledge Items */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#00d9ff] border-t-transparent"></div>
              <p className="text-gray-400">Loading knowledge base...</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center py-20"
          >
            <div className="text-center">
              <Database className="mx-auto mb-4 h-16 w-16 text-gray-600" />
              <h3 className="mb-2 text-2xl font-semibold text-white">No Knowledge Sources</h3>
              <p className="mb-6 text-gray-400">
                Add your first knowledge source to get started
              </p>
              <ShimmerButton onClick={() => setIsAddModalOpen(true)}>
                <Plus className="mr-2 h-5 w-5" />
                Add Knowledge
              </ShimmerButton>
            </div>
          </motion.div>
        ) : (
          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl border border-[#00d9ff]/20 bg-black/40 p-6 backdrop-blur-sm transition-all hover:border-[#00d9ff]/60"
              >
                {/* Border Beam on Hover */}
                <BorderBeam
                  size={200}
                  duration={15}
                  delay={index * 2}
                  colorFrom="#00d9ff"
                  colorTo="#0066ff"
                />

                {/* Item Content */}
                <div className="relative z-10">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#0066ff] text-white">
                      {item.source_type === 'website' ? '🌐' : '📄'}
                    </div>
                    <span className="rounded-full bg-[#00d9ff]/20 px-3 py-1 text-xs text-[#00d9ff]">
                      {item.source_type}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-[#00d9ff]">
                    {item.title || 'Untitled'}
                  </h3>

                  <p className="mb-4 text-sm text-gray-400">
                    {item.url?.length > 50 ? item.url.substring(0, 50) + '...' : item.url}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{item.document_count || 0} docs</span>
                    <span>•</span>
                    <span>{item.embedding_count || 0} embeddings</span>
                  </div>
                </div>

                {/* Actions on Hover */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex translate-y-full transform-gpu justify-center gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    onClick={() => {
                      setDocumentBrowserSourceId(item.id);
                      setIsDocumentBrowserOpen(true);
                    }}
                    className="pointer-events-auto rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#0066ff] px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105"
                  >
                    Browse Documents
                  </button>
                </div>
              </motion.div>
            ))}
          </BentoGrid>
        )}
      </div>

      {/* Modals - Keep existing functionality */}
      <AddKnowledgeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadKnowledgeItems}
        progressItems={progressItems}
        setProgressItems={setProgressItems}
      />

      {showCrawlingTab && (
        <CrawlingTab
          progressItems={progressItems}
          setProgressItems={setProgressItems}
          onClose={() => setShowCrawlingTab(false)}
        />
      )}

      {documentBrowserSourceId && (
        <DocumentBrowser
          isOpen={isDocumentBrowserOpen}
          onClose={() => {
            setIsDocumentBrowserOpen(false);
            setDocumentBrowserSourceId(null);
          }}
          sourceId={documentBrowserSourceId}
        />
      )}
    </div>
  );
};