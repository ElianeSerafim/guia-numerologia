import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Shield, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * AdminManagement Component
 * 
 * Permite adicionar, visualizar e gerenciar administradores do sistema
 */
export default function AdminManagement() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'super_admin'>('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Queries
  const { data: admins, isLoading, refetch } = trpc.admins.getAll.useQuery();
  
  // Mutations
  const createAdminMutation = trpc.admins.create.useMutation();
  const updateAdminMutation = trpc.admins.update.useMutation();

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Email inválido');
      return;
    }

    setIsSubmitting(true);

    try {
      await createAdminMutation.mutateAsync({
        email,
        name,
        role,
      });

      toast.success(`Admin ${name} adicionado com sucesso!`);
      setEmail('');
      setName('');
      setRole('admin');
      setOpen(false);
      refetch();
    } catch (error: any) {
      const errorMessage = error?.message || 'Erro ao adicionar admin';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (adminId: number, currentStatus: boolean) => {
    try {
      await updateAdminMutation.mutateAsync({
        id: adminId,
        isActive: !currentStatus,
      });

      toast.success(`Admin ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`);
      refetch();
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao atualizar admin');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com botão de adicionar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gerenciar Administradores</h2>
          <p className="text-sm text-slate-600 mt-1">
            Adicione e gerencie usuários com acesso ao painel administrativo
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-400 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Admin
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Administrador</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo administrador que terá acesso ao painel
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="border-slate-300"
                />
              </div>

              {/* Nome */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Nome Completo
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="border-slate-300"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-slate-700">
                  Tipo de Acesso
                </label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger className="border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Admin
                      </div>
                    </SelectItem>
                    <SelectItem value="super_admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Super Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  Super Admin pode gerenciar outros admins
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-cyan-400 hover:bg-indigo-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adicionando...
                    </>
                  ) : (
                    'Adicionar Admin'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Admins */}
      {admins && admins.length > 0 ? (
        <div className="grid gap-4">
          {admins.map((admin) => (
            <Card key={admin.id} className="border-slate-200">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{admin.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        admin.role === 'super_admin'
                          ? 'bg-purple-100 text-cyan-500'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        <Shield className="w-3 h-3" />
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        admin.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {admin.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Ativo
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3" />
                            Inativo
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-2">{admin.email}</p>

                    <div className="flex gap-4 text-xs text-slate-500">
                      <span>Criado em: {new Date(admin.createdAt).toLocaleDateString('pt-BR')}</span>
                      {admin.createdBy && <span>Por: {admin.createdBy}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(admin.id, admin.isActive)}
                      className={admin.isActive ? 'text-amber-600 border-amber-200' : 'text-green-600 border-green-200'}
                    >
                      {admin.isActive ? 'Desativar' : 'Ativar'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-slate-200">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">Nenhum administrador encontrado</p>
            <p className="text-sm text-slate-500 mt-1">Clique em "Adicionar Admin" para criar o primeiro</p>
          </CardContent>
        </Card>
      )}

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-base text-blue-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• <strong>Admin:</strong> Pode gerenciar clientes, pagamentos e visualizar relatórios</p>
          <p>• <strong>Super Admin:</strong> Pode fazer tudo que um Admin faz, além de gerenciar outros admins</p>
          <p>• Admins inativos não conseguem acessar o painel</p>
          <p>• Sempre mantenha pelo menos um Super Admin ativo</p>
        </CardContent>
      </Card>
    </div>
  );
}
