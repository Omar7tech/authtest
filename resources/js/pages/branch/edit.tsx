import BranchController from "@/actions/App/Http/Controllers/BranchController"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Head, useForm } from "@inertiajs/react"
import { Branch } from "@/types/index.d"

const edit = ({ branch }: { branch: Branch }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: branch.name || '',
    code: branch.code || '',
    phone: branch.phone || '',
    email: branch.email || '',
    country: branch.country || '',
    city: branch.city || '',
    address: branch.address || '',
    is_active: branch.is_active ?? true,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    put(`/branches/${branch.id}`)
  }

  return (
    <>
      <Head title={`Edit Branch - ${branch.name}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit Branch</CardTitle>
            <CardDescription>Update branch information and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Code *</Label>
                  <Input
                    id="code"
                    value={data.code}
                    onChange={e => setData('code', e.target.value)}
                    className={errors.code ? 'border-red-500' : ''}
                  />
                  {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={data.country}
                    onChange={e => setData('country', e.target.value)}
                    className={errors.country ? 'border-red-500' : ''}
                  />
                  {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={data.city}
                    onChange={e => setData('city', e.target.value)}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={data.address}
                  onChange={e => setData('address', e.target.value)}
                  className={errors.address ? 'border-red-500' : ''}
                  rows={3}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={data.is_active}
                  onCheckedChange={(checked) => setData('is_active', checked)}
                />
                <Label htmlFor="is_active" className="cursor-pointer">Active</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default edit

edit.layout = {
  breadcrumbs: [
    {
      title: 'Branches',
      href: BranchController.index(),
    },
    {
      title: 'Edit',
    },
  ],
}
